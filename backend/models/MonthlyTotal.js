const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const MonthlyTotal = Sequelize.define('MonthlyTotal', {
  year: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  month: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  total_income: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total_expenses: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
}, {
  tableName: 'monthly_totals',
  timestamps: false,
});

module.exports = MonthlyTotal;
