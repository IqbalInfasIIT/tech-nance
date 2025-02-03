class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory(category, type) {
    if (type !== 'income_categories' && type !== 'expense_categories') {
      throw new Error('Invalid category type specified');
    }

    const mainCategoryCount = await this.getMainCategoryCount(type);

    if (mainCategoryCount >= 10) {
      throw new Error(`Cannot add more than 10 ${type} categories.`);
    }

    return this.categoryModel.addCategory(category, type);
  }

  async deleteCategory(categoryId, type) {
    if (type !== 'income_categories' && type !== 'expense_categories') {
      throw new Error('Invalid category type specified');
    }

    return this.categoryModel.deleteCategory(categoryId, type);
  }

  async getMainCategoryCount(type) {
    return this.categoryModel.getMainCategoryCount(type);
  }

  async getMainCategories(type) {
    return this.categoryModel.getMainCategories(type);
  }

  async getLinkedCategories(type, parentId) {
    return this.categoryModel.getLinkedCategories(type, parentId);
  }
}

module.exports = CategoryService;
