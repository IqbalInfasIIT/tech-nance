const transactionService = require('../services/transactionService');

exports.getAllTransactions = async (req, res) => {
  try {
    const results = await transactionService.getAllTransactions();
    res.json(results);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send('Error fetching transactions');
  }
};

exports.getAllTransactionsWithNames = async (req, res) => {
  try {
    const results = await transactionService.getAllTransactionsWithNames();
    res.json(results);
  } catch (err) {
    console.error('Error fetching transactions with names:', err);
    res.status(500).send('Error fetching transactions with names');
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(req.body);
    res.status(201).json({ message: 'Transaction added successfully!', transaction });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ message: `Error adding transaction: ${err.message}` });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    await transactionService.deleteTransaction(transactionId);
    res.send('Transaction deleted successfully');
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).send(`Error deleting transaction: ${err.message}`);
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).send('Transaction not found');
    }
    res.json(transaction);
  } catch (err) {
    console.error('Error fetching transaction details:', err);
    res.status(500).send('Error fetching transaction details');
  }
};

exports.getIncomeBreakdown = async (req, res) => {
  try {
    const period = req.query.period;
    const results = await transactionService.getIncomeBreakdown(period);
    res.json(results);
  } catch (err) {
    console.error('Error fetching income breakdown:', err);
    res.status(500).send('Error fetching income breakdown');
  }
};

exports.getExpenseBreakdown = async (req, res) => {
  try {
    const period = req.query.period;
    const results = await transactionService.getExpenseBreakdown(period);
    res.json(results);
  } catch (err) {
    console.error('Error fetching expense breakdown:', err);
    res.status(500).send('Error fetching expense breakdown');
  }
};

exports.getMonthlyTotals = async (req, res) => {
  try {
    const results = await transactionService.getMonthlyTotals();
    res.json(results);
  } catch (err) {
    console.error('Error fetching monthly totals:', err);
    res.status(500).send('Error fetching monthly totals');
  }
};

