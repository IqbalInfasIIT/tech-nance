const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');

class CategoryService {
  constructor() {
    this.models = {
      income_categories: IncomeCategory,
      expense_categories: ExpenseCategory,
    };
  }

  async addCategory(category, type) {
    if (!this.models[type]) {
      throw new Error('Invalid category type specified');
    }
    if (!category.name || category.name.trim() === '') {
      throw new Error('Category name is required.');
    }

    const mainCategoryCount = await this.getMainCategoryCount(type);
    if (mainCategoryCount >= 10) {
      throw new Error(`Cannot add more than 10 ${type} categories.`);
    }

    return this.models[type].addCategory(category);
  }

  async deleteCategory(categoryId, type) {
    if (!this.models[type]) {
      throw new Error('Invalid category type specified');
    }

    return this.models[type].deleteCategory(categoryId);
  }

  async getMainCategoryCount(type) {
    if (!this.models[type]) {
      throw new Error('Invalid category type specified');
    }

    return this.models[type].getMainCategoryCount();
  }

  async getMainCategories(type) {
    if (!this.models[type]) {
      throw new Error('Invalid category type specified');
    }

    return this.models[type].getMainCategories();
  }

  async getLinkedCategories(type, parentId) {
    if (!this.models[type]) {
      throw new Error('Invalid category type specified');
    }

    return this.models[type].getLinkedCategories(parentId);
  }
}

module.exports = new CategoryService();
