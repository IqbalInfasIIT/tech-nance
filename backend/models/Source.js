const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class Source extends Model {
  static async getAllActive() {
    return await this.findAll({ where: { is_Active: true } });
  }

  static async add(source) {
    return await this.create({
      source_type: source.sourceType,
      source_name: source.sourceName,
      balance: source.balance,
      is_Active: true,
      is_bank_account: source.isBankAccount,
      bank_number: source.bankNumber,
    });
  }
  
  static async markInactive(sourceId) {
    return await this.update(
      { is_Active: false },
      { where: { source_id: sourceId } }
    );
  }

  static async getById(sourceId) {
    return await this.findByPk(sourceId);
  }

  static async incrementBalance(sourceId, amount) {
    const source = await this.findByPk(sourceId);
    if (source) {
      source.balance += amount;
      return await source.save();
    }
    return null;
  }
  
  static async decrementBalance(sourceId, amount) {
    const source = await this.findByPk(sourceId);
    if (source) {
      source.balance -= amount;
      return await source.save();
    }
    return null;
  }
}

Source.init({
  source_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  source_type: {
    type: DataTypes.ENUM('Account'),
    allowNull: false,
  },
  source_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  is_Active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_bank_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bank_number: {
    type: DataTypes.STRING,
    defaultValue: null,
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
  sequelize,
  modelName: 'Source',
  tableName: 'capital_sources',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Source;
