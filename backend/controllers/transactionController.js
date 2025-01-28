const db = require('../database/db');
const Transaction = require('../models/Transaction');
const TransactionService = require('../services/transactionService');
const Source = require('../models/Source');
const transactionModel = new Transaction(db);
const transactionService = new TransactionService(transactionModel);
const sourceModel = new Source(db);

exports.getAllTransactions = async (req, res) => {
  try {
    const [results] = await transactionService.getAllTransactions();
    res.json(results);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).send('Error fetching transactions');
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = req.body;
    console.log('Received transaction:', transaction);

    const defaultValues = {
      date: new Date().toISOString().split('T')[0],
      number: 'N/A',
      description: 'No description provided',
      type: 'income',
      amount: '0.00',
      sourceId: '0',
      sourceType: 'source',
      destinationId: null,
      destinationType: null,
      paymentMethod: 'Cash'
    };

    // Merge transaction with default values
    const finalTransaction = { ...defaultValues, ...transaction };

    console.log('Final transaction with defaults:', finalTransaction);

    // Add the transaction
    await transactionService.addTransaction(finalTransaction);

    // Update balances based on the transaction type
    switch (finalTransaction.type) {
      case 'transfer':
        await sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        await sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      case 'income':
        await sourceModel.incrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        break;
      case 'expense':
        await sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        break;
      case 'refund':
        await sourceModel.incrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        break;
      case 'topup':
        await sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        await sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      case 'settle':
        await sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        await sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      default:
        break;
    }
    console.log('half')
    res.status(201).json({ message: 'Transaction added successfully!' });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ message: 'Error adding transaction' });
  }
  console.log('complete')
};

exports.getTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const [results] = await transactionService.getTransactionById(transactionId);
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching transaction details:', err);
    res.status(500).send('Error fetching transaction details');
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

exports.getTotalIncome = async (req, res) => {
  try {
    const period = req.query.period;
    console.log('getTotalIncome called with period:', period); // Log the period
    const [results] = await transactionService.getTotalIncome(period);
    console.log('Total Income Results:', results); // Log the results
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching total income:', err);
    res.status(500).send('Error fetching total income');
  }
};

exports.getIncomeBreakdown = async (req, res) => {
  try {
    const period = req.query.period;
    console.log('getIncomeBreakdown called with period:', period); // Log the period
    const [results] = await transactionService.getIncomeBreakdown(period);
    console.log('Income Breakdown Results:', results); // Log the results
    res.json(results);
  } catch (err) {
    console.error('Error fetching income breakdown:', err);
    res.status(500).send('Error fetching income breakdown');
  }
};

exports.getTotalExpense = async (req, res) => {
  try {
    const period = req.query.period;
    console.log('getTotalExpense called with period:', period); // Log the period
    const [results] = await transactionService.getTotalExpense(period);
    console.log('Total Expense Results:', results); // Log the results
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching total expense:', err);
    res.status(500).send('Error fetching total expense');
  }
};

exports.getExpenseBreakdown = async (req, res) => {
  try {
    const period = req.query.period;
    console.log('getExpenseBreakdown called with period:', period); // Log the period
    const [results] = await transactionService.getExpenseBreakdown(period);
    console.log('Expense Breakdown Results:', results); // Log the results
    res.json(results);
  } catch (err) {
    console.error('Error fetching expense breakdown:', err);
    res.status(500).send('Error fetching expense breakdown');
  }
};

