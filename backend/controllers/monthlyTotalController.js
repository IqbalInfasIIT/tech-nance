const MonthlyTotal = require('../models/MonthlyTotal');
const { Op } = require('sequelize');

class MonthlyTotalController {
    static async getSingleMonthTotal(year, month) {
      try {
        return await MonthlyTotal.findAll({ where: { year, month } });
      } catch (error) {
        throw error;
      }
    }
  
    static async getPeriodTotals(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const startYear = start.getFullYear();
      const startMonth = start.getMonth() + 1;
      const endYear = end.getFullYear();
      const endMonth = end.getMonth() + 1;
  
      try {
        return await MonthlyTotal.findAll({
          where: {
            year: { [Op.between]: [startYear, endYear] },
            month: { [Op.between]: [startMonth, endMonth] }
          },
          order: [['year', 'ASC'], ['month', 'ASC']]
        });
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = MonthlyTotalController;
  