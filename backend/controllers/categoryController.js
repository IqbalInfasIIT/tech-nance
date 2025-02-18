class CategoryController {
  async addCategory(model, category) {
    return model.create({
      category_name: category.name,
      parent_category_id: category.parentCategoryId,
      isActive: category.isActive,
    });
  }

  async markCategoryInactive(model, categoryId) {
    return model.update({ isActive: false }, { where: { category_id: categoryId } });
  }

  async getMainCategories(model) {
    return model.findAll({ where: { parent_category_id: null, isActive: true } });
  }

  async getMainCategoryCount(model) {
    return model.count({ where: { parent_category_id: null, isActive: true } });
  }

  async getLinkedCategories(model, parentId) {
    return model.findAll({ where: { parent_category_id: parentId, isActive: true } });
  }
}

module.exports = CategoryController;
