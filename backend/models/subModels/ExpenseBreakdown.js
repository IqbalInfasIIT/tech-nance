const { Sequelize } = require('sequelize');
const sequelize = require('../../database/database');
const Transaction = require('../Transaction');
const ExpenseCategory = require('../ExpenseCategory');

class ExpenseBreakdown {
  static async getExpenseBreakdown(period) {
    return Transaction.getAll({
      attributes: [
        'ExpenseCategory.category_name',
        [
          Sequelize.literal('SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) - SUM(CASE WHEN type = "refund" THEN amount ELSE 0 END)'),
          'total_amount'
        ],
      ],
      where: {
        date: { [Sequelize.Op.like]: `${period}%` },
      },
      include: [
        { model: ExpenseCategory, as: 'destination', attributes: [], where: { parent_category_id: null }, required: false },
      ],
      group: ['ExpenseCategory.category_name'],
      order: [[Sequelize.literal('total_amount'), 'DESC']],
    });
  }
}

module.exports = ExpenseBreakdown;
