import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveBudgets, deleteBudget, getAllBudgets } from '../Services/BudgetApi';
import { getCategoryTotalsByPeriod  } from '../Services/MonthlyCategoryTotalsApi';
import './BudgetsScreen.css';

function BudgetsScreen() {
  const [budgets, setBudgets] = useState([]);
  const [budgetNames, setBudgetNames] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeBudgets = await getActiveBudgets();
        setBudgets(activeBudgets);
        const allBudgets = await getAllBudgets();
        const uniqueNames = [...new Set(allBudgets.map(b => b.budget_name))];
        setBudgetNames(uniqueNames);
        console.log(activeBudgets)
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = async (budget) => {
    setSelectedBudget(budget);
  
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
  
    try {
      const totals = await getCategoryTotalsByPeriod(year, month);
      const expenseCategories = totals.filter(category => category.category_type === "expense");
  
      const mappedCategories = expenseCategories.map(category => {
        const matchingCategory = budget.categories.find(
          bCategory => bCategory.category_id === category.category_id
        );
        return {
          ...category,
          targetAmount: matchingCategory ? parseFloat(matchingCategory.amount) : 0
        };
      });
  
      setCategoryTotals(mappedCategories);
    } catch (error) {
      console.error('Error fetching category totals:', error);
    }
  };
  
  const handleDeleteBudgetClick = async (budgetName) => {
    const confirmed = window.confirm("Are you sure you want to delete this budget?");
    if (confirmed) {
      try {
        await deleteBudget(budgetName);
        setBudgets(budgets.filter(budget => budget.name !== budgetName));
        alert("Budget deleted successfully");
      } catch (error) {
        console.error('Error deleting budget:', error);
        alert(error.response ? error.response.data : 'Error deleting budget');
      }
    }
  };

  const getCategoryName = (category) =>
    category.incomeCategory
      ? category.incomeCategory.category_name
      : category.expenseCategory.category_name;

  return (
    <div className="bs-main-container">
      <div className="bs-left-panel">
        <h3>Budgets</h3>
        <div className="bs-budget-list">
        {budgets.map(budget => (
          <div
            key={budget.name}
            className="bs-budget-card"
            onClick={() => handleCardClick(budget)}
          >
            <div className="bs-card-header">
              <h3>{budget.name}</h3>
              <p>Period: Monthly</p>
            </div>

              <div className="bs-budget-details">
                <div className="bs-budget-column">
                  {budget.categories
                    .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
                    .slice(0, 3)
                    .map(category => (
                    <div key={category.category_id} className="bs-category">
                      <span className="bs-category-name">{category.category_name}</span>
                      <span className="bs-category-amount">
                        {new Intl.NumberFormat().format(category.amount)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bs-card-footer">
              <button
                className="bs-edit-btn"
                onClick={(e) => { e.stopPropagation(); /* Add edit functionality */ }}
              >
                Edit
              </button>
              <button
                className="bs-delete-btn"
                onClick={(e) => { e.stopPropagation(); handleDeleteBudgetClick(budget.name); }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="bs-add-budget" onClick={() => navigate('/add-budget', { state: { budgetNames } })}>
          <h3>Add Budget</h3>
        </div>
      </div>
    </div>

    <div className="bs-right-panel">
      {selectedBudget ? (
        <>
          <h3>Details for {selectedBudget.name}</h3>
          <div className="bs-category-progress">
            {categoryTotals.map((category) => (
              <div key={category.category_id} className="bs-progress-item">
                <span>
                  {category.expenseCategory
                    ? category.expenseCategory.category_name
                    : "Unknown Category"}
                </span>
                <div className="bs-progress-bar-container">
                  <div
                    className="bs-progress-bar"
                    style={{
                      width: `${
                        category.targetAmount > 0
                          ? (parseFloat(category.total_amount) / category.targetAmount) * 100
                          : 0
                      }%`,  
                    }}
                  ></div>
                </div>
                <span>
                  {new Intl.NumberFormat().format(category.total_amount)} / 
                  {new Intl.NumberFormat().format(category.targetAmount)}
                </span>
              </div>
            ))}
          </div>
        </>
        ) : (
          <p>Please select a budget to view details</p>
          )}
      </div>
    </div>
  );
}

export default BudgetsScreen;
