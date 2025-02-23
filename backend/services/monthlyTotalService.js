const { Op } = require('sequelize');
const MonthlyTotal = require('../models/MonthlyTotal');

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
        // Same year, fetch directly using between
        results = await MonthlyTotal.findAll({
          where: {
            year: startYear,
            month: { [Op.between]: [startMonth, endMonth] }
          },
          order: [['year', 'ASC'], ['month', 'ASC']]
        });
      } else {
        // Different years, fetch for each segment
        const startYearResults = await MonthlyTotal.findAll({
          where: {
            year: startYear,
            month: { [Op.between]: [startMonth, 12] }
          },
          order: [['year', 'ASC'], ['month', 'ASC']]
        });

        const endYearResults = await MonthlyTotal.findAll({
          where: {
            year: endYear,
            month: { [Op.between]: [1, endMonth] }
          },
          order: [['year', 'ASC'], ['month', 'ASC']]
        });

        const middleYearsResults = await MonthlyTotal.findAll({
          where: {
            year: { [Op.between]: [startYear + 1, endYear - 1] }
          },
          order: [['year', 'ASC'], ['month', 'ASC']]
        });

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
