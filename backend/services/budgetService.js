const BudgetController = require('../controllers/budgetController');
const budgetController = new BudgetController();

class BudgetService {
  async addBudget(budgetName, categories) {
    for (const category of categories) {
      const { categoryId, categoryName, amount } = category;
      await budgetController.addBudget({
        budgetName,
        categoryId,
        categoryName,
        amount,
        period: 'Monthly',
        createdDate: new Date().toISOString(),
      });
    }
  }
  async getAllBudgets() {
    return budgetController.getAllBudgets();
  }

  async getActiveBudgets() {
    return budgetController.getActiveBudgets();
  }

  async markBudgetInactive(budgetName) {
    return budgetController.markBudgetInactive(budgetName);
  }

  async getBudgetByName(budgetName) {
    return budgetController.getBudgetByName(budgetName);
  }
}

module.exports = BudgetService;
