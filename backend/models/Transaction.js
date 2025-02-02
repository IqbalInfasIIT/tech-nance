const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const TransactionWithNames = require('./subModels/TransactionWithNames');
const MonthlyTotals = require('./subModels/MonthlyTotals');
const IncomeBreakdown = require('./subModels/IncomeBreakdown');
const ExpenseBreakdown = require('./subModels/ExpenseBreakdown');
const Source = require('./Source');
const IncomeCategory = require('./IncomeCategory');
const ExpenseCategory = require('./ExpenseCategory');

class Transaction extends Model {
  static async getAll() {
    return this.findAll();
  }

  static async getAllWithNames() {
    return TransactionWithNames.getAllWithNames();
  }

  static async add(transaction) {
    return this.create(transaction);
  }

  static async delete(transactionId) {
    return this.destroy({ where: { transaction_id: transactionId } });
  }

  static async getById(transactionId) {
    return this.findByPk(transactionId);
  }

  static async getIncomeBreakdown(period) {
    return IncomeBreakdown.getIncomeBreakdown(period);
  }

  static async getExpenseBreakdown(period) {
    return ExpenseBreakdown.getExpenseBreakdown(period);
  }

  static async getMonthlyTotals() {
    return await MonthlyTotals.findAll({
      order: [
        ['year', 'ASC'],
        ['month', 'ASC']
      ],
      limit: 12,
    });
  }
}

Transaction.init({
  transaction_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('transfer', 'income', 'expense', 'refund'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  source_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  source_type: {
    type: DataTypes.ENUM('source', 'income_category', 'expense_category'),
    allowNull: false,
  },
  destination_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  destination_type: {
    type: DataTypes.ENUM('source', 'income_category', 'expense_category'),
    defaultValue: null,
  },
  payment_method: {
    type: DataTypes.ENUM('Transfer', 'Cash'),
    defaultValue: null,
  },
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transactions',
  timestamps: false,
});

Transaction.belongsTo(Source, { as: 'sourceCapital', foreignKey: 'source_id', constraints: false, scope: { source_type: 'source' } });
Transaction.belongsTo(IncomeCategory, { as: 'sourceIncome', foreignKey: 'source_id', constraints: false, scope: { source_type: 'income_category' } });
Transaction.belongsTo(ExpenseCategory, { as: 'sourceExpense', foreignKey: 'source_id', constraints: false, scope: { source_type: 'expense_category' } });

Transaction.belongsTo(Source, { as: 'destinationCapital', foreignKey: 'destination_id', constraints: false, scope: { destination_type: 'source' } });
Transaction.belongsTo(IncomeCategory, { as: 'destinationIncome', foreignKey: 'destination_id', constraints: false, scope: { destination_type: 'income_category' } });
Transaction.belongsTo(ExpenseCategory, { as: 'destinationExpense', foreignKey: 'destination_id', constraints: false, scope: { destination_type: 'expense_category' } });

module.exports = Transaction;
