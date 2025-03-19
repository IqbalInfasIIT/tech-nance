import React, { useState, useEffect } from 'react';
import { getMainCategories } from '../Services/CategoryApi';
import { addBudget, getPredictions } from '../Services/BudgetApi';
import BudgetedAmountInput from './BudgetedAmountInput';
import { useLocation } from 'react-router-dom';
import './AddBudgetScreen.css';

const AddBudgetsScreen = () => {
  const location = useLocation();
  const budgetNames = location.state?.budgetNames || [];

  const [budgetName, setBudgetName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [budgetList, setBudgetList] = useState([]);
  const [error, setError] = useState('');
  const [predictedBudgetList, setPredictedBudgetList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingAmount, setEditingAmount] = useState('');
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getMainCategories('expense_categories');
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(
    (category) => !budgetList.some((item) => item.category_id === category.category_id)
  );

  const handleAddCategoryToTable = () => {
    if (selectedCategory && amount) {
      const newBudget = {
        category_id: selectedCategory.category_id,
        category_name: selectedCategory.category_name,
        amount: parseFloat(amount.replace(/,/g, '')),
      };
      setBudgetList([...budgetList, newBudget]);
      setAmount('');
    } else {
      alert('Please select a category and enter an amount');
    }
  };

  const handleEditAmount = (index, amount) => {
    setEditingIndex(index);
    setEditingAmount(new Intl.NumberFormat().format(amount));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value) && value >= 0) {
      setEditingAmount(new Intl.NumberFormat().format(value));
    }
  };

  const handleSaveEditedAmount = () => {
    if (editingIndex !== null) {
      const updatedBudgetList = [...budgetList];
      updatedBudgetList[editingIndex].amount = parseFloat(editingAmount.replace(/,/g, ''));
      setBudgetList(updatedBudgetList);
      setEditingIndex(null);
      setEditingAmount('');
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedBudgetList = budgetList.filter((_, i) => i !== index);
    setBudgetList(updatedBudgetList);
  };

  const handleSaveBudget = async () => {
    try {
      if (budgetName && budgetList.length > 0) {
        const newBudget = {
          budgetName,
          categories: budgetList.map((item) => ({
            categoryId: item.category_id,
            categoryName: item.category_name,
            amount: item.amount,
          })),
        };
        setLoadingPredictions(true);
        await addBudget(newBudget);
        alert('Budget saved successfully');

        setBudgetName('');
        setSelectedCategory(null);
        setAmount('');
        setBudgetList([]);
      } else {
        alert('Please provide a valid budget name and add categories');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      alert('Failed to save budget');
    } finally {
      setLoadingPredictions(false);
    }
  };

  const handleGetPredictions = async () => {
    try {
      if (budgetList.length === 0) {
        alert('Please add categories before predicting');
        return;
      }
      setLoadingPredictions(true);
      const predictions = await getPredictions(budgetList);
      setPredictedBudgetList(predictions);
    } catch (error) {
        console.error('Error getting predictions:', error);
        let errorMessage = 'Failed to get budget predictions';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        }
        alert(errorMessage);
    } finally {
      setLoadingPredictions(false);
    }
  };

  const handleBudgetNameChange = (e) => {
    const name = e.target.value;
    setBudgetName(name);

    if (budgetNames.some(existingName => existingName.toLowerCase() === name.toLowerCase())) {
      setError('Budget name already exists. Please choose another.');
    } else {
      setError('');
    }
  };

  return (
    <div className="abs-add-budget-container">
      <div className="abs-left-panel">
        <div className="abs-field">
          <label>Budget Name</label>
          <input
            type="text"
            value={budgetName}
            onChange={handleBudgetNameChange}
            placeholder="Enter budget name"
          />
        </div>
        <div className="abs-field">
          <label>Select Category</label>
          <select
            onChange={(e) =>
              setSelectedCategory(filteredCategories.find((cat) => cat.category_id === parseInt(e.target.value)))
            }
            value={selectedCategory ? selectedCategory.category_id : ''}
          >
            <option value="">Select a category</option>
            {filteredCategories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="abs-field">
          <label>Amount</label>
          <BudgetedAmountInput amount={amount} setAmount={setAmount} error={error} setError={setError} />
        </div>
        <button onClick={handleAddCategoryToTable} className="abs-insert-button">
          Insert
        </button>

        <div className="abs-bottom-buttons">
          <button onClick={handleSaveBudget} className="abs-save-button">
            Save Budget
          </button>
          <button onClick={handleGetPredictions} className="abs-predict-button">
            Get Predictions
          </button>
        </div>
      </div>

      <div className="abs-right-panel">
        <table className="abs-budget-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget Amount</th>
              <th>Predicted Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgetList.map((item, index) => (
              <tr key={index}>
                <td>{item.category_name}</td>
                <td
                  onClick={() => handleEditAmount(index, item.amount)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingAmount}
                      onChange={handleAmountChange}
                      onBlur={handleSaveEditedAmount}
                      autoFocus
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <>
                      <span>{new Intl.NumberFormat().format(item.amount)}</span>
                      <div className="editable-hint">edit</div>
                    </>
                  )}
                </td>
                <td>
                  {(() => {
                    const prediction = predictedBudgetList.find(pred => pred.category_id === item.category_id);
                    return prediction ? new Intl.NumberFormat().format(prediction.predicted_amount) : 'N/A';
                    })()}
                  </td>
                <td>
                  <button onClick={() => handleRemoveCategory(index)} className="remove-button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loadingPredictions && (
            <div className="abs-loading-overlay">
                <div className="abs-spinner"></div>
            </div>
        )}
    </div>
  );
};

export default AddBudgetsScreen;
