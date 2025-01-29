class Category {
  constructor(db) {
    this.db = db;
  }

  async addCategory(category, type) {
    const query = `INSERT INTO ${type} (category_name, parent_category_id, isActive) VALUES (?, ?, ?)`;
    const values = [category.name, category.parentCategoryId, category.isActive];
    return this.db.promise().query(query, values);
  }

  async deleteCategory(categoryId, type) {
    const deleteSubcategoriesQuery = `UPDATE ${type} SET isActive = FALSE WHERE parent_category_id = ?`;
    await this.db.promise().query(deleteSubcategoriesQuery, [categoryId]);

    const deleteMainCategoryQuery = `UPDATE ${type} SET isActive = FALSE WHERE category_id = ?`;
    return this.db.promise().query(deleteMainCategoryQuery, [categoryId]);
  }

  async getMainCategoryCount(type) {
    const query = `SELECT COUNT(*) AS main_category_count FROM ${type} WHERE parent_category_id IS NULL AND isActive = TRUE`;
    const [rows] = await this.db.promise().query(query);
    return rows[0].main_category_count;
  }

  async getMainCategories(type) {
    const query = `SELECT * FROM ${type} WHERE parent_category_id IS NULL AND isActive = TRUE`;
    const [rows] = await this.db.promise().query(query);
    return rows;
  }
  
  async getLinkedCategories(type, parentId) {
    const query = `SELECT * FROM ${type} WHERE parent_category_id = ? AND isActive = TRUE`;
    const [rows] = await this.db.promise().query(query, [parentId]);
    return rows;
  }
}

module.exports = Category;
