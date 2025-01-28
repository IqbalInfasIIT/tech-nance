import React, { useState } from 'react';
import AddCategoryPopup from '../Category/AddCategoryPopup';

function ExpenseForm({ formData, handleInputChange, expenseCategories, addCategory }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (value === 'add') {
      setShowPopup(true);
    } else {
      handleInputChange(e);
      handleInputChange({ target: { name: 'destinationId', value: value } });
      handleInputChange({ target: { name: 'destinationType', value: 'expense_category' } });
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Expense Category:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleCategoryChange} required>
        <option value="">Select an expense category</option>
        <option value="add">Add a category</option>
        {expenseCategories.map(category => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <AddCategoryPopup 
        open={showPopup}
        handleClose={handlePopupClose}
        categoryType="expense"
        categories={expenseCategories}
        addCategory={addCategory}
      />
    </div>
  );
}

export default ExpenseForm;
