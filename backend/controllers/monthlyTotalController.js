const MonthlyTotal = require('../models/MonthlyTotal');
const { Op } = require('sequelize');

class MonthlyTotalController {
    async fetchMonthlyTotals(yearParam, startMonth, endMonth) {
      return await MonthlyTotal.findAll({
        where: {
          year: yearParam,
          month: { [Op.between]: [startMonth, endMonth] }
        },
        order: [['year', 'ASC'], ['month', 'ASC']]
      });
    }

    async fetchMiddleYearsResults(startYear, endYear) {
      return await MonthlyTotal.findAll({
        where: {
          year: { [Op.between]: [startYear+1, endYear-1] }
        },
        order: [['year', 'ASC'], ['month', 'ASC']]
      });
    }

}
  
module.exports = MonthlyTotalController;
  