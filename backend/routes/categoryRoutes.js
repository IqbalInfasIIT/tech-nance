const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/get-income-categories', categoryController.getIncomeCategories);
router.get('/get-expense-categories', categoryController.getExpenseCategories);

module.exports = router;
