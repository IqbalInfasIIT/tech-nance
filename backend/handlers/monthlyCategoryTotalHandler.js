const MonthlyCategoryTotalService = require('../services/monthlyCategoryTotalService');
const monthlyCategoryTotalService = new MonthlyCategoryTotalService();

exports.getCategoryTotalsExpenseByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await monthlyCategoryTotalService.getCategoryTotalsExpenseByCategoryId(categoryId);
    res.json(results);
  } catch (err) {
    console.error('Error fetching Category totals by category ID:', err);
    res.status(500).send('Error fetching Category totals by category ID');
  }
};

exports.getAllCategoryTotals = async (req, res) => {
  try {
    const results = await monthlyCategoryTotalService.getAllCategoryTotals();
    res.json(results);
  } catch (err) {
    console.error('Error fetching All Category totals:', err);
    res.status(500).send('Error fetching Category totals by period');
  }
};

exports.getCategoryTotalsByPeriod = async (req, res) => {
  try {
    const { year, month } = req.params;
    const results = await monthlyCategoryTotalService.getCategoryTotalsByPeriod(year, month);
    res.json(results);
  } catch (err) {
    console.error('Error fetching Category totals by period:', err);
    res.status(500).send('Error fetching Category totals by period');
  }
};
