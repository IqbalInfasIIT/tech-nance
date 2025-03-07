const MonthlyCategoryTotal = require('../models/MonthlyCategoryTotal');

class MonthlyCategoryTotalController {
  async getTotalsByCategoryId(categoryId) {
    return MonthlyCategoryTotal.findAll({
      where: { category_id: categoryId },
      order: [['year', 'DESC'], ['month', 'DESC']],
    });
  }

  async getTotalsByPeriod(year, month) {
    return MonthlyCategoryTotal.findAll({
      where: { year: year, month: month },
    });
  }

}

module.exports = MonthlyCategoryTotalController;
