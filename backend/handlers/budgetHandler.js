const BudgetService = require('../services/budgetService');
const budgetService = new BudgetService();

exports.addBudget = async (req, res) => {
  try {
    const { budgetName, categories } = req.body; 
    if (!budgetName || !Array.isArray(categories)) {
      return res.status(400).send('Invalid input: budget name and categories are required');
    }

    await budgetService.addBudget(budgetName, categories);

    res.status(201).send('Budget added successfully');
  } catch (err) {
    console.error('Error adding budget:', err);
    res.status(500).send('Error adding budget');
  }
};

exports.getAllBudgets = async (req, res) => {
  try {
    const results = await budgetService.getAllBudgets();
    res.json(results);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).send('Error fetching budgets');
  }
};

exports.getActiveBudgets = async (req, res) => {
  try {
    const results = await budgetService.getActiveBudgets();
    res.json(results);
  } catch (err) {
    console.error('Error fetching active budgets:', err);
    res.status(500).send('Error fetching active budgets');
  }
};

exports.markBudgetInactive = async (req, res) => {
  try {
    console.log("reach the blody backend")
    const { budgetName } = req.params;
    await budgetService.markBudgetInactive(budgetName);
    res.status(200).send('Budget marked as inactive');
  } catch (err) {
    console.error('Error marking budget inactive:', err);
    res.status(500).send('Error marking budget inactive');
  }
};

exports.getBudgetByName = async (req, res) => {
  try {
    const { budgetName } = req.params;
    const budget = await budgetService.getBudgetByName(budgetName);
    if (budget && budget.length > 0) {
      res.json(budget);
    } else {
      res.status(404).send('Budget not found');
    }
  } catch (err) {
    console.error('Error fetching budget by name:', err);
    res.status(500).send('Error fetching budget by name');
  }
};
