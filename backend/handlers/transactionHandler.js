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
    console.log(transaction);
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
    res.status(500).send('Error deleting transaction');
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const result = await transactionService.getTransactionById(transactionId);
    res.json(result);
  } catch (err) {
    console.error('Error fetching transaction details:', err);
    res.status(500).send('Error fetching transaction details');
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

