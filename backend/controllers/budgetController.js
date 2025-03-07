const Budget = require('../models/Budget');
const { Op } = require('sequelize'); 

class BudgetController {
  async addBudget(budget) {
    try {
      return Budget.create({
        budget_name: budget.budgetName,
        category_id: budget.categoryId,
        category_name: budget.categoryName,
        amount: budget.amount,
        period: budget.period,
        created_date: budget.createdDate,
      });
    } catch (error) {
      console.error('Error adding budget:', error);
      throw new Error('Error adding budget.');
    }
  }

  async getAllBudgets() {
    return Budget.findAll();
  }

  async getActiveBudgets() {
    const activeBudgets = await Budget.findAll({
      where: { is_active: true },
      attributes: ['budget_name', 'category_id', 'category_name', 'amount'],
      raw: true, 
    });

    const groupedBudgets = activeBudgets.reduce((acc, row) => {
      const { budget_name, category_id, category_name, amount } = row;

      if (!acc[budget_name]) {
        acc[budget_name] = {
          name: budget_name,
          categories: [],
        };
      }

      acc[budget_name].categories.push({
        category_id: category_id,
        category_name: category_name,
        amount: amount,
      });

      return acc;
    }, {});

    return Object.values(groupedBudgets);
  }

  async markBudgetInactive(budgetName) {
    await Budget.update({ is_active: false }, { where: { budget_name: budgetName } });
    return;
  }

  async getBudgetByName(budgetName) {
    return Budget.findAll({ where: { budget_name: budgetName } });
  }
}

module.exports = BudgetController;
