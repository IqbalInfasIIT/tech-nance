const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/get-transactions', transactionController.getAllTransactions);
router.post('/add-transaction', transactionController.addTransaction);
router.get('/:transactionId', transactionController.getTransactionById);
router.delete('/:transactionId', transactionController.deleteTransaction);

module.exports = router;
