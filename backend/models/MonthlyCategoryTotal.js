const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const MonthlyCategoryTotal = Sequelize.define('MonthlyCategoryTotal', {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  category_type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
}, {
  tableName: 'monthly_category_totals',
  timestamps: false,
});

const IncomeCategory = require('./IncomeCategory');
const ExpenseCategory = require('./ExpenseCategory');

MonthlyCategoryTotal.belongsTo(IncomeCategory, {
  foreignKey: 'category_id',
  targetKey: 'category_id',
  as: 'incomeCategory',
  constraints: false,
});

MonthlyCategoryTotal.belongsTo(ExpenseCategory, {
  foreignKey: 'category_id',
  targetKey: 'category_id',
  as: 'expenseCategory',
  constraints: false,
});


module.exports = MonthlyCategoryTotal;