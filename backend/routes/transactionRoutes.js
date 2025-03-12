const express = require('express');
const router = express.Router();
const transactionHandler = require('../handlers/transactionHandler');

router.get('/get-transactions', transactionHandler.getAllTransactions);
router.get('/get-transactions-with-names', transactionHandler.getAllTransactionsWithNames);
router.get('/get-date-range', transactionHandler.getTransactionDateRange);
router.get('/get-id/:transactionId', transactionHandler.getTransactionById);
router.get('/get-id-plus/:transactionId', transactionHandler.getTransactionByIdPlus);
router.delete('/delete-id/:transactionId', transactionHandler.deleteTransaction);
router.post('/add-transaction', transactionHandler.addTransaction);

module.exports = router;
