const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Routes for fetching data
router.get('/get-transactions', transactionController.getAllTransactions);
router.get('/total-income', transactionController.getTotalIncome);
router.get('/income-breakdown', transactionController.getIncomeBreakdown);
router.get('/total-expense', transactionController.getTotalExpense);
router.get('/expense-breakdown', transactionController.getExpenseBreakdown);
router.get('/monthly-totals', transactionController.getMonthlyTotals); 
router.get('/get-transactions-with-names', transactionController.getAllTransactionsWithNames); 

router.get('/get-id/:transactionId', transactionController.getTransactionById); 
router.delete('/delete-id/:transactionId', transactionController.deleteTransaction); 


router.post('/add-transaction', transactionController.addTransaction);

module.exports = router;
