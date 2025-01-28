const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/get-transactions', transactionController.getAllTransactions);
router.get('/total-income', transactionController.getTotalIncome);
router.get('/income-breakdown', transactionController.getIncomeBreakdown);
router.get('/total-expense', transactionController.getTotalExpense);
router.get('/expense-breakdown', transactionController.getExpenseBreakdown);
router.post('/add-transaction', transactionController.addTransaction);
router.get('/:transactionId', transactionController.getTransactionById);
router.delete('/:transactionId', transactionController.deleteTransaction);

module.exports = router;
