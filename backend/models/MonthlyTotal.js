const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const MonthlyTotal = Sequelize.define('MonthlyTotal', {
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
  total_income: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
  total_expenses: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
}, {
  tableName: 'monthly_totals',
  timestamps: false,
});

module.exports = MonthlyTotal;
