const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const Budget = Sequelize.define('Budget', {
  budget_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  budget_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'expense_categories',
      key: 'category_id',
    },
  },
  category_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  period: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'budgets',
  timestamps: false,

  indexes: [
    {
      unique: true,
      fields: ['budget_name', 'category_id'],
    },
  ],
});

module.exports = Budget;
