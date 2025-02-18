const MonthlyTotalService = require('../services/monthlyTotalService');
const monthlyTotalService = new MonthlyTotalService();

exports.getMonthlyTotals = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const results = await monthlyTotalService.getMonthlyTotals(startDate, endDate);
    res.json(results);
  } catch (err) {
    console.error('Error fetching monthly totals:', err);
    res.status(500).send('Error fetching monthly totals');
  }
};
