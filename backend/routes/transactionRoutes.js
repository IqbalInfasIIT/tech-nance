//transactionRoutes.js

const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/totals/:accountId?', transactionController.getTotals);
router.get('/get-transactions/:accountId?', transactionController.getAllTransactions);
router.get('/sorted-transactions/:accountId?', transactionController.getSortedTransactions);

router.post('/add-transaction', transactionController.addTransaction);
router.get('/income-categories', transactionController.getIncomeCategories);
router.get('/expense-categories', transactionController.getExpenseCategories);


module.exports = router;
