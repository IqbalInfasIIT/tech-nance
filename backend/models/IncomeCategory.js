const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class IncomeCategory extends Model {
  static async addCategory(category) {
    return await this.create({
      category_name: category.name,
      parent_category_id: category.parentCategoryId,
      isActive: category.isActive,
    });
  }

  static async deleteCategory(categoryId) {
    await this.update(
      { isActive: false },
      { where: { parent_category_id: categoryId } }
    );

    return await this.update(
      { isActive: false },
      { where: { category_id: categoryId } }
    );
  }

  static async getMainCategoryCount() {
    return await this.count({
      where: {
        parent_category_id: null,
        isActive: true,
      },
    });
  }

  static async getMainCategories() {
    return await this.findAll({
      where: {
        parent_category_id: null,
        isActive: true,
      },
    });
  }

  static async getLinkedCategories(parentId) {
    return await this.findAll({
      where: {
        parent_category_id: parentId,
        isActive: true,
      },
    });
  }
}

IncomeCategory.init({
  category_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_category_id: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'IncomeCategory',
  tableName: 'income_categories',
  timestamps: false,
});

module.exports = IncomeCategory;
