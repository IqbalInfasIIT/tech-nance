const express = require('express');
const router = express.Router();
const monthlyCategoryTotalHandler = require('../handlers/monthlyCategoryTotalHandler');

router.get('/category/:categoryId', monthlyCategoryTotalHandler.getTotalsByCategoryId);
router.get('/period/:year/:month', monthlyCategoryTotalHandler.getTotalsByPeriod);

module.exports = router;
