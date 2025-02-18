const express = require('express');
const router = express.Router();
const monthlyTotalHandler = require('../handlers/monthlyTotalHandler');

router.get('/get-monthly-totals', monthlyTotalHandler.getMonthlyTotals);

module.exports = router;
