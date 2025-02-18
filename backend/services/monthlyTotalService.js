const MonthlyTotalController = require('../controllers/MonthlyTotalController');

class MonthlyTotalService {
    async getMonthlyTotals(startDate, endDate) {
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
                console.log("this is 1", start,end)
                return await MonthlyTotalController.getSingleMonthTotal(start.getFullYear(), start.getMonth() + 1);
            } else {
                console.log("this is 2", start,end)
                return await MonthlyTotalController.getPeriodTotals(startDate, endDate);
            }
        } catch (error) {
            throw new Error(`Error fetching monthly totals: ${error.message}`);
        }
    }
}

module.exports = MonthlyTotalService;
