const axios = require('axios');
const MonthlyCategoryTotalController = require('./monthlyCategoryTotalController');
const monthlyCategoryTotalController = new MonthlyCategoryTotalController();

class BudgetPredictionController {
  async getPredictions(budgetList) {
    try {
      if (!budgetList || !Array.isArray(budgetList) || budgetList.length === 0) {
        throw new Error("Invalid budget list: must be a non-empty array.");
      }

      const categoryMonthlyTotalsPromises = budgetList.map(async (category) => {
        const categoryId = category.category_id;

        if (!categoryId) {
          throw new Error(`Missing category_id in budget list entry: ${JSON.stringify(category)}`);
        }

        const monthlyCategoryTotals = await monthlyCategoryTotalController.getCategoryTotalsExpenseByCategoryId(categoryId);

        if (!monthlyCategoryTotals || monthlyCategoryTotals.length === 0) {
          console.warn(`No expense data found for category_id ${categoryId}`);
          return [];
        }

        return monthlyCategoryTotals.map(item => ({
          category_id: item.category_id,
          total_amount: parseFloat(item.total_amount),
          year_month: `${item.year}${String(item.month).padStart(2, '0')}`,
        }));
      });

      const categoryMonthlyTotals = await Promise.all(categoryMonthlyTotalsPromises);

      const filteredCategoryMonthlyTotals = categoryMonthlyTotals.filter(data => data.length > 0);

      if (filteredCategoryMonthlyTotals.length === 0) {
        throw new Error("No valid historical expense data found for predictions.");
      }

      return await this.sendToPythonForPrediction(filteredCategoryMonthlyTotals);
    } catch (error) {
      console.error("Error processing predictions in Controller:", error.message);
      throw new Error(error.message);
    }
  }

  async sendToPythonForPrediction(categoryMonthlyTotals) {
    try {
      console.log("Sending to Python Service:", JSON.stringify(categoryMonthlyTotals, null, 2));

      const response = await axios.post('http://localhost:5000/predict', { categoryMonthlyTotals });

      return response.data;
    } catch (error) {
      console.error("Error calling Python prediction service:", error.message);
      throw new Error("Error calling Python prediction service.");
    }
  }
}

module.exports = BudgetPredictionController;
