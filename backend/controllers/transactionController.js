const db = require('../database/db');
const axios = require('axios');

// 1. Add a transaction to the DB
exports.addTransaction = (req, res) => {
  const { amount, category } = req.body;
  db.run('INSERT INTO transactions (amount, category) VALUES (?, ?)', [amount, category], function(err) {
    if (err) {
      return res.status(500).send('Error saving transaction');
    }
    res.status(200).send('Transaction added successfully');
  });
};

// 2. Retrieve totals and categories for pie chart and totals table
exports.getTotals = (req, res) => {
  db.all('SELECT category, SUM(amount) as total FROM transactions GROUP BY category', (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving totals');
    }
    const totals = { rent: 0, food: 0, travel: 0, personal: 0 };
    rows.forEach(row => {
      if (totals.hasOwnProperty(row.category)) {
        totals[row.category] = row.total;
      }
    });
    res.json(totals);
  });
};

// 3. Retrieve all transactions
exports.getAllTransactions = (req, res) => {
  db.all('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving transactions');
    }
    res.json(rows);
  });
};

// 4. Retrieve all transactions and send to Flask for sorting
exports.getSortedTransactions = async (req, res) => {
  db.all('SELECT * FROM transactions', async (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving transactions');
    }
    try {
      const response = await axios.post('http://localhost:5000/sort', rows);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error processing transaction');
    }
  });
};
