const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const CapitalSource = Sequelize.define('CapitalSource', {
  source_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  source_type: {
    type: DataTypes.ENUM('Account'),
    allowNull: false,
  },
  source_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_bank_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bank_number: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'capital_sources',
  timestamps: false,
});

module.exports = CapitalSource;