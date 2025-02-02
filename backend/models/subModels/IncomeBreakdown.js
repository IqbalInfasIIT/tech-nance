const { Sequelize } = require('sequelize');
const sequelize = require('../../database/database');
const Transaction = require('../Transaction');
const IncomeCategory = require('../IncomeCategory');

class IncomeBreakdown {
  static async getIncomeBreakdown(period) {
    return Transaction.getAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
      ],
      where: {
        type: 'income',
        date: { [Sequelize.Op.like]: `${period}%` },
      },
      include: [
        { model: IncomeCategory, as: 'destination', attributes: ['category_name'], where: { parent_category_id: null }, required: false },
      ],
      group: ['IncomeCategory.category_name'],
      order: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'DESC']],
    });
  }
}

module.exports = IncomeBreakdown;
