import React, { useState } from 'react';
import CategoryPopup from './CategoryComp/CategoryPopup';
import { Link } from 'react-router-dom';
import './Form.css';

function ExpenseForm({ handleInputChange, expenseCategories, deleteCategory, expenseMainCategoryCount }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    handleInputChange({ target: { name: 'destinationId', value: categoryId } });
    handleInputChange({ target: { name: 'destinationType', value: 'expense_category' } });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Expense Category:</label>
      <div className="selected-category-container">
        <input
          type="text"
          className="selected-category-field"
          value={selectedCategory}
          placeholder="Select a category"
          readOnly
        />
        <button type="button" className="selected-category-button" onClick={() => setShowPopup(true)}>Select category</button>
        <button type="button" className="add-category-button">
          <Link to="/add-category/expense_categories">Add Category</Link>
        </button>
      </div>
      <CategoryPopup
        open={showPopup}
        handleClose={handlePopupClose}
        type="expense_categories"
        categories={expenseCategories}
        onSelect={handleCategoryChange}
        onDelete={(categoryId) => deleteCategory(categoryId, 'expense_categories')}
        count={expenseMainCategoryCount}
      />
    </div>
  );
}

export default ExpenseForm;
