const MonthlyCategoryTotalController = require('../controllers/monthlyCategoryTotalController');
const monthlyCategoryTotalController = new MonthlyCategoryTotalController();

class MonthlyCategoryTotalService {
  async getCategoryTotalsExpenseByCategoryId(categoryId) {
    return monthlyCategoryTotalController.getCategoryTotalsExpenseByCategoryId(categoryId);
  }

  async getAllCategoryTotals() {
    return monthlyCategoryTotalController.getAllCategoryTotals();
  }

  async getCategoryTotalsByPeriod(year, month) {
    return monthlyCategoryTotalController.getCategoryTotalsByPeriod(year, month);
  }
}

module.exports = MonthlyCategoryTotalService;
