const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

class MonthlyTotals extends Model {}

MonthlyTotals.init({
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
    allowNull: false,
  },
  total_expenses: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'MonthlyTotals',
  tableName: 'monthly_totals',
  timestamps: false,
});

module.exports = MonthlyTotals;
