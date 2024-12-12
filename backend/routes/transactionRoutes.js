const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/totals', transactionController.getTotals); 
router.get('/get-transactions', transactionController.getAllTransactions);
router.get('/sorted-transactions', transactionController.getSortedTransactions);
router.post('/add-transaction', transactionController.addTransaction);

module.exports = router;
