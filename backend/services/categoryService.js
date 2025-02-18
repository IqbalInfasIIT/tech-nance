const CategoryController = require('../controllers/categoryController');
const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');
const categoryController = new CategoryController();

class CategoryService {
  async getModel(type) {
    switch (type) {
      case 'income_categories':
        return IncomeCategory;
      case 'expense_categories':
        return ExpenseCategory;
      default:
        throw new Error('Invalid category type specified');
    }
  }

  async addCategory(category, type) {
    const model = await this.getModel(type);
    return categoryController.addCategory(model, category);
  }

  async markCategoryInactive(categoryId, type) {
    const model = await this.getModel(type);
    return categoryController.markCategoryInactive(model, categoryId);
  }

  async getMainCategoryCount(type) {
    const model = await this.getModel(type);
    return categoryController.getMainCategoryCount(model);
  }

  async getMainCategories(type) {
    const model = await this.getModel(type);
    return categoryController.getMainCategories(model);
  }

  async getLinkedCategories(type, parentId) {
    const model = await this.getModel(type);
    return categoryController.getLinkedCategories(model, parentId);
  }
}

module.exports = CategoryService;