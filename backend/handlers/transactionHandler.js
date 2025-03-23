const TransactionService = require('../services/transactionService');
const transactionService = new TransactionService();

exports.getAllTransactions = async (req, res) => {
  try {
    const results = await transactionService.getAllTransactions();
    res.json(results);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send('Error fetching transactions');
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    await transactionService.addTransaction(transaction);
    res.status(201).json({ message: 'Transaction added successfully!' });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ message: 'Error adding transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    await transactionService.deleteTransaction(transactionId);
    res.send('Transaction deleted successfully');
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).send('Error deleting transaction', err);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
      const transactionId = req.params.transactionId;
      const transaction = await transactionService.getTransactionById(transactionId);
      if (!transaction) {
          return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
  } catch (err) {
      console.error('Error fetching transaction by ID:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTransactionByIdPlus = async (req, res) => {
  try {
      const transactionId = req.params.transactionId;
      const transaction = await transactionService.getTransactionByIdPlus(transactionId);
      if (!transaction) {
          return res.status(404).json({ error: 'Transaction not found' });
      }
      res.json(transaction);
  } catch (err) {
      console.error('Error fetching transaction by ID Plus:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllTransactionsWithNames = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const results = await transactionService.getAllTransactionsWithNames(startDate, endDate);
    res.json(results);
  } catch (err) {
    console.error('Error fetching transactions with names:', err);
    res.status(500).send('Error fetching transactions with names');
  }
};

exports.getMonthlyTotals = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const results = await transactionService.getMonthlyTotals(startDate, endDate);
    res.json(results);
  } catch (err) {
    console.error('Error fetching monthly totals:', err);
    res.status(500).send('Error fetching monthly totals');
  }
};

exports.getTransactionDateRange = async (req, res) => {
  try {
    const dateRange = await transactionService.getTransactionDateRange();
    res.json(dateRange);
  } catch (err) {
    console.error('Error fetching transaction date range:', err);
    res.status(500).send('Error fetching transaction date range');
  }
};

