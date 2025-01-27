const db = require('../database/db');

class CategoryService {
  constructor(db) {
    this.db = db;
  }

  async getIncomeCategories() {
    const query = 'SELECT * FROM income_categories';
    const [results] = await this.db.promise().query(query);
    return results;
  }

  async getExpenseCategories() {
    const query = 'SELECT * FROM expense_categories';
    const [results] = await this.db.promise().query(query);
    return results;
  }
}

module.exports = new CategoryService(db);
