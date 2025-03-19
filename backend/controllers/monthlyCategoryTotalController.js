const MonthlyCategoryTotal = require('../models/MonthlyCategoryTotal');
const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');

const { Sequelize, QueryTypes } = require('sequelize');


class MonthlyCategoryTotalController {
  async getCategoryTotalsExpenseByCategoryId(categoryId) {
    return MonthlyCategoryTotal.findAll({
      where: {
        category_id: categoryId,
        category_type: 'expense',
      },
      order: [['year', 'DESC'], ['month', 'DESC']],
    });
  }

  async getAllCategoryTotals() {
    return MonthlyCategoryTotal.findAll({
      include: [
        {
          model: IncomeCategory,
          as: 'incomeCategory',
          required: false,
          attributes: ['category_name'],
          where: Sequelize.literal(`MonthlyCategoryTotal.category_type = 'income'`)
        },
        {
          model: ExpenseCategory,
          as: 'expenseCategory',
          required: false,
          attributes: ['category_name'],
          where: Sequelize.literal(`MonthlyCategoryTotal.category_type = 'expense'`)
        }
      ],
      order: [['year', 'DESC'], ['month', 'DESC']],
    });
  }

  async getCategoryTotalsByPeriod(year, month) {
    return MonthlyCategoryTotal.findAll({
      where: { year, month },
      include: [
        {
          model: IncomeCategory,
          as: 'incomeCategory',
          required: false,
          attributes: ['category_name'],
          where: Sequelize.literal(`MonthlyCategoryTotal.category_type = 'income'`)
        },
        {
          model: ExpenseCategory,
          as: 'expenseCategory',
          required: false,
          attributes: ['category_name'],
          where: Sequelize.literal(`MonthlyCategoryTotal.category_type = 'expense'`)
        }
      ]
    });
  }
  

}

module.exports = MonthlyCategoryTotalController;
