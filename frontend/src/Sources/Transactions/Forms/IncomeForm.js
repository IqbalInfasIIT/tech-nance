import React, { useState, useEffect } from 'react';
import CategoryPopup from './CategoryComp/CategoryPopup';
import { Link } from 'react-router-dom';
import './Form.css';


function IncomeForm({ handleInputChange, incomeCategories, deleteCategory, incomeMainCategoryCount, sourceId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    handleInputChange({ target: { name: 'destination_id', value: sourceId } });
    handleInputChange({ target: { name: 'destination_type', value: 'source' } });
  }, [sourceId, handleInputChange]);

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    handleInputChange({ target: { name: 'source_id', value: categoryId } });
    handleInputChange({ target: { name: 'source_type', value: 'income_category' } });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Source of Income:</label>
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
          <Link className="full-button-link" to="/add-category/income_categories">Add Category</Link>
        </button>
      </div>
      <CategoryPopup
        open={showPopup}
        handleClose={handlePopupClose}
        type="income_categories"
        categories={incomeCategories}
        onSelect={handleCategoryChange}
        onDelete={(categoryId) => deleteCategory(categoryId, 'income_categories')}
        count={incomeMainCategoryCount}
      />
    </div>
  );
}

export default IncomeForm;
