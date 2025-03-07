const MonthlyCategoryTotalService = require('../services/monthlyCategoryTotalService');
const monthlyCategoryTotalService = new MonthlyCategoryTotalService();

exports.getTotalsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await monthlyCategoryTotalService.getTotalsByCategoryId(categoryId);
    res.json(results);
  } catch (err) {
    console.error('Error fetching totals by category ID:', err);
    res.status(500).send('Error fetching totals by category ID');
  }
};

exports.getTotalsByPeriod = async (req, res) => {
  try {
    const { year, month } = req.params;
    const results = await monthlyCategoryTotalService.getTotalsByPeriod(year, month);
    res.json(results);
  } catch (err) {
    console.error('Error fetching totals by period:', err);
    res.status(500).send('Error fetching totals by period');
  }
};
