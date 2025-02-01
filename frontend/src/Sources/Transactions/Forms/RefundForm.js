import React, { useState } from 'react';
import CategoryPopup from './CategoryComp/CategoryPopup';
import './Form.css';

function RefundForm({ formData, handleInputChange, expenseCategories }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    handleInputChange({ target: { name: 'destinationId', value: categoryId } });
    handleInputChange({ target: { name: 'destinationType', value: 'income_category' } });
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
        <button 
          type="button" 
          className="selected-category-button" 
          onClick={() => setShowPopup(true)}
        >
          Select category
        </button>
      </div>
      <CategoryPopup
        open={showPopup}
        handleClose={handlePopupClose}
        type="expense_categories"
        categories={expenseCategories}
        onSelect={handleCategoryChange}
        showDelete={false}
      />
    </div>
  );
}

export default RefundForm;