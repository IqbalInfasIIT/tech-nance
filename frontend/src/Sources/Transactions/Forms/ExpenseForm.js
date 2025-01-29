import React, { useState } from 'react';
import CategoryPopup from './CategoryComp/CategoryPopup';
import AddCategoryPopup from './CategoryComp/AddCategoryPopup'; // Import AddCategoryPopup
import './Form.css';

function ExpenseForm({ handleInputChange, expenseCategories, addCategory, deleteCategory, expenseMainCategoryCount }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false); // State to handle Add Category Popup
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    handleInputChange({ target: { name: 'destinationId', value: categoryId } });
    handleInputChange({ target: { name: 'destinationType', value: 'expense_categories' } });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleAddPopupClose = () => {
    setShowAddPopup(false);
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
        <button 
          type="button" 
          className="add-category-button" 
          onClick={() => setShowAddPopup(true)}
        >
          Add Category
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
      <AddCategoryPopup
        open={showAddPopup}
        handleClose={handleAddPopupClose}
        type="expense_categories"
        addCategory={addCategory}
        categories={expenseCategories}
      />
    </div>
  );
}

export default ExpenseForm;
