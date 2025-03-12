const BudgetPredictionController = require('../controllers/budgetPredictionController');
const budgetPredictionController = new BudgetPredictionController();

class BudgetPredictionService {
  async getPredictions(budgetList) {
    return budgetPredictionController.getPredictions(budgetList);
  }
}

module.exports = BudgetPredictionService;
