class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory(category, type) {
    return this.categoryModel.addCategory(category, type);
  }

  async deleteCategory(categoryId, type) {
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
