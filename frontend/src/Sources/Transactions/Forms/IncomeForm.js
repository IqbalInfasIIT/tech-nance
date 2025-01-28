import React, { useState } from 'react';
import AddCategoryPopup from '../Category/AddCategoryPopup';

function IncomeForm({ formData, handleInputChange, incomeCategories, addCategory }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    if (value === 'add') {
      setShowPopup(true);
    } else {
      handleInputChange(e);
      handleInputChange({ target: { name: 'destinationId', value: value } });
      handleInputChange({ target: { name: 'destinationType', value: 'income_category' } });
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Source of Income:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleCategoryChange} required>
        <option value="">Select an income category</option>
        <option value="add">Add a category</option>
        {incomeCategories.map(category => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
      <AddCategoryPopup 
        open={showPopup}
        handleClose={handlePopupClose}
        categoryType="income"
        categories={incomeCategories}
        addCategory={addCategory}
      />
    </div>
  );
}

export default IncomeForm;
