const { Sequelize } = require('sequelize');
const sequelize = require('../../database/database');
const Transaction = require('../Transaction');
const Source = require('../Source');
const IncomeCategory = require('../IncomeCategory');
const ExpenseCategory = require('../ExpenseCategory');

class TransactionWithNames {
  static async getAllWithNames() {
    return Transaction.findAll({
      include: [
        { model: Source, as: 'sourceCapital', attributes: ['source_name'], required: false },
        { model: IncomeCategory, as: 'sourceIncome', attributes: ['category_name'], required: false },
        { model: ExpenseCategory, as: 'sourceExpense', attributes: ['category_name'], required: false },
        { model: Source, as: 'destinationCapital', attributes: ['source_name'], required: false },
        { model: IncomeCategory, as: 'destinationIncome', attributes: ['category_name'], required: false },
        { model: ExpenseCategory, as: 'destinationExpense', attributes: ['category_name'], required: false },
      ],
      order: [['date', 'DESC']],
      attributes: [
        'transaction_id',
        [Sequelize.fn('DATE', Sequelize.col('date')), 'date'],
        'number',
        'description',
        'type',
        'amount',
        'source_type',
        'destination_type',
      ],
    });
  }
}

module.exports = TransactionWithNames;
