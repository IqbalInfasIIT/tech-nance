//transactionController.js

const db = require('../database/db');
const axios = require('axios');

exports.addTransaction = (req, res) => {
  const { date, number, description, type, amount, fromAccount, toAccountOrCategory } = req.body;
  let query = '';
  let params = [];

  if (type === 'transfer') {
    query = 'INSERT INTO transactions (date, number, description, type, amount, from_account_id, to_account_or_category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    params = [date, number, description, type, amount, fromAccount, toAccountOrCategory];
  } else if (type === 'income' || type === 'expense' || type === 'refund') {
    query = 'INSERT INTO transactions (date, number, description, type, amount, from_account_id, to_account_or_category) VALUES (?, ?, ?, ?, ?, ?, ?)';
    params = [date, number, description, type, amount, fromAccount, toAccountOrCategory];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Error saving transaction');
    }
    res.status(200).send('Transaction added successfully');
  });
};

exports.getIncomeCategories = (req, res) => {
  db.query('SELECT * FROM income_categories', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving income categories');
    }
    res.json(results);
  });
};

exports.getExpenseCategories = (req, res) => {
  db.query('SELECT * FROM expense_categories', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving expense categories');
    }
    res.json(results);
  });
};


exports.getTotals = (req, res) => {
  const accountId = req.params.accountId;
  const query = accountId
    ? 'SELECT category, SUM(amount) as total FROM transactions WHERE account_id = ? GROUP BY category'
    : 'SELECT category, SUM(amount) as total FROM transactions GROUP BY category';
  const params = accountId ? [accountId] : [];
  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving totals');
    }
    const totals = { rent: 0, food: 0, travel: 0, personal: 0 };
    results.forEach(row => {
      if (totals.hasOwnProperty(row.category)) {
        totals[row.category] = row.total ? parseFloat(row.total) : 0;
      }
    });
    res.json(totals);
  });
};

exports.getAllTransactions = (req, res) => {
  const accountId = req.params.accountId;
  const query = accountId
    ? 'SELECT * FROM transactions WHERE account_id = ?'
    : 'SELECT * FROM transactions';
  const params = accountId ? [accountId] : [];
  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving transactions');
    }
    res.json(results);
  });
};

exports.getSortedTransactions = async (req, res) => {
  const accountId = req.params.accountId;
  const query = accountId
    ? 'SELECT * FROM transactions WHERE account_id = ?'
    : 'SELECT * FROM transactions';
  const params = accountId ? [accountId] : [];
  db.query(query, params, async (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving transactions');
    }
    try {
      const response = await axios.post('http://localhost:5000/sort', results);
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error processing transaction');
    }
  });
};
