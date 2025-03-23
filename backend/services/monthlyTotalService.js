const { Op } = require('sequelize');
const MonthlyTotal = require('../models/MonthlyTotal');
const MonthlyTotalController = require('../controllers/monthlyTotalController');
const monthlyTotalController = new MonthlyTotalController();

class MonthlyTotalService {
  async getMonthlyTotals(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth() + 1;
    const endYear = end.getFullYear();
    const endMonth = end.getMonth() + 1;

    try {
      let results = [];

      if (startYear === endYear) {
        results = await monthlyTotalController.fetchMonthlyTotals(startYear,startMonth,endMonth)
      } else {
        const startYearResults = await monthlyTotalController.fetchMonthlyTotals(startYear,startMonth,12)

        const endYearResults = await monthlyTotalController.fetchMonthlyTotals(endYear,1,endMonth)

        const middleYearsResults = await monthlyTotalController.fetchMiddleYearsResults(startYear,endYear)

        results = [...startYearResults, ...middleYearsResults, ...endYearResults];
      }

      return results.map(result => ({
        year: result.year,
        month: result.month,
        total_income: result.total_income,
        total_expenses: result.total_expenses
      }));

    } catch (error) {
      throw new Error(`Error fetching monthly totals: ${error.message}`);
    }
  }
}

module.exports = MonthlyTotalService;