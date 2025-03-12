const BudgetPredictionService = require('../services/budgetPredictionService');
const budgetPredictionService = new BudgetPredictionService();

exports.getPredictions = async (req, res) => {
    try {
      const { budgetList } = req.body;
  
      if (!budgetList || !Array.isArray(budgetList)) {
        return res.status(400).json({ error: 'Invalid input: budget list is required' });
      }
  
      const predictions = await budgetPredictionService.getPredictions(budgetList);
      
      console.log("this is predicted", predictions);
  
      res.status(200).json(predictions);
    } catch (err) {
      console.error("Error processing predictions in Handler:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
