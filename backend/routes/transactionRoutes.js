const express = require('express');
const router = express.Router();
const transactionHandler = require('../handlers/transactionHandler');

router.get('/get-transactions', transactionHandler.getAllTransactions);
router.get('/income-breakdown', transactionHandler.getIncomeBreakdown);
router.get('/expense-breakdown', transactionHandler.getExpenseBreakdown);
router.get('/monthly-totals', transactionHandler.getMonthlyTotals);
router.get('/get-transactions-with-names', transactionHandler.getAllTransactionsWithNames);
router.get('/get-id/:transactionId', transactionHandler.getTransactionById);
router.delete('/delete-id/:transactionId', transactionHandler.deleteTransaction);
router.post('/add-transaction', transactionHandler.addTransaction);

module.exports = router;
