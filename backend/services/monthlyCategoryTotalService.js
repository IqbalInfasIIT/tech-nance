const MonthlyCategoryTotalController = require('../controllers/monthlyCategoryTotalController');
const monthlyCategoryTotalController = new MonthlyCategoryTotalController();

class MonthlyCategoryTotalService {
  async getTotalsByCategoryId(categoryId) {
    return monthlyCategoryTotalController.getTotalsByCategoryId(categoryId);
  }

  async getTotalsByPeriod(year, month) {
    return monthlyCategoryTotalController.getTotalsByPeriod(year, month);
  }
}

module.exports = MonthlyCategoryTotalService;
