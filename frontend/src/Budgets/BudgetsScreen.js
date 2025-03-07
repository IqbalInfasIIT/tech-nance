import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveBudgets, deleteBudget, getAllBudgets } from '../Services/BudgetApi';
import './BudgetsScreen.css';

function BudgetsScreen() {
  const [budgets, setBudgets] = useState([]);
  const [budgetNames, setBudgetNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeBudgets = await getActiveBudgets();
        setBudgets(activeBudgets);
        const allBudgets = await getAllBudgets();
        const uniqueNames = [...new Set(allBudgets.map(b => b.budget_name))];
        setBudgetNames(uniqueNames);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (budgetName) => {
    navigate(`/budgets/${budgetName}`);
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

  return (
    <div className="bs-main-container">
      {/* Left Panel */}
      <div className="bs-left-panel">
        <h3>Budgets</h3>
        <div className="bs-budget-list">
          {budgets.map(budget => (
            <div
              key={budget.name}
              className="bs-budget-card"
              onClick={() => handleCardClick(budget.name)}
            >
              <div className="bs-card-header">
                <h3>{budget.name}</h3>
                <p>Period: Monthly</p>
              </div>

              <div className="bs-budget-details">
                <div className="bs-budget-column">
                  {budget.categories.slice(0, 3).map(category => (
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

      {/* Empty Right Panel */}
      <div className="bs-right-panel">
        <p>This is the empty right panel.</p>
      </div>
    </div>
  );
}

export default BudgetsScreen;
