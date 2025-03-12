const express = require('express');
const router = express.Router();
const monthlyCategoryTotalHandler = require('../handlers/monthlyCategoryTotalHandler');

router.get('/category/:categoryId', monthlyCategoryTotalHandler.getCategoryTotalsExpenseByCategoryId);
router.get('/get-all-category-totals', monthlyCategoryTotalHandler.getAllCategoryTotals);
router.get('/period/:year/:month', monthlyCategoryTotalHandler.getCategoryTotalsByPeriod);

module.exports = router;
