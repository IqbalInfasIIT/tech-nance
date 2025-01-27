const CategoryService = require('../services/categoryService');

exports.getIncomeCategories = async (req, res) => {
  try {
    const results = await CategoryService.getIncomeCategories();
    res.json(results);
  } catch (err) {
    console.error('Error fetching income categories:', err);
    res.status(500).send('Error fetching income categories');
  }
};

exports.getExpenseCategories = async (req, res) => {
  try {
    const expenseCategories = await CategoryService.getExpenseCategories();
    res.json(expenseCategories);
  } catch (err) {
    console.error('Error fetching expense categories:', err);
    res.status(500).send('Error fetching expense categories');
  }
};
