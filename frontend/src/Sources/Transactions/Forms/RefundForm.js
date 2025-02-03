import React, { useState, useEffect } from 'react';
import CategoryPopup from './CategoryComp/CategoryPopup';
import './Form.css';

function RefundForm({ handleInputChange, expenseCategories, sourceId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    handleInputChange({ target: { name: 'destinationId', value: sourceId } });
    handleInputChange({ target: { name: 'destinationType', value: 'source' } });
  }, [sourceId, handleInputChange]);

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    handleInputChange({ target: { name: 'sourceId', value: categoryId } });
    handleInputChange({ target: { name: 'sourceType', value: 'expense_category' } });
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