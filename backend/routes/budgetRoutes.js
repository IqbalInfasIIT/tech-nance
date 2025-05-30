const express = require('express');
const router = express.Router();
const budgetHandler = require('../handlers/budgetHandler');
const budgetPredictionHandler = require('../handlers/budgetPredictionHandler');

router.post('/get-predictions', budgetPredictionHandler.getPredictions);

router.post('/add-budget', budgetHandler.addBudget);
router.get('/get-all-budgets', budgetHandler.getAllBudgets);
router.get('/get-active-budgets', budgetHandler.getActiveBudgets);
router.get('/get-budget-by-name/:budgetName', budgetHandler.getBudgetByName);
router.delete('/mark-inactive/:budgetName', budgetHandler.markBudgetInactive);

module.exports = router;
