const Budget = require('../models/Budget');

class BudgetController {
  async addBudget(budget) {
    return Budget.create({
      budget_name: budget.budgetName,
      category_id: budget.categoryId,
      category_name: budget.categoryName,
      amount: budget.amount,
      period: budget.period,
      created_date: budget.createdDate,
    });
  }

  async getAllBudgets() {
    return Budget.findAll();
  }

  async getActiveBudgets() {
    return Budget.findAll({ where: { is_active: true } });
  }

  async markBudgetInactive(budgetId) {
    await Budget.update({ is_active: false }, { where: { budget_id: budgetId } });
    return;
  }

  async getBudgetById(budgetId) {
    return Budget.findByPk(budgetId);
  }
}

module.exports = BudgetController;
