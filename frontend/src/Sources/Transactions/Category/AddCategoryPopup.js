import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddCategoryPopup({ open, handleClose, categoryType, categories, addCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  const handleSave = () => {
    const newCategory = {
      category_name: categoryName,
      parent_category_id: parentCategoryId || null
    };
    addCategory(newCategory);
    handleClose();
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={handleClose}>
      <div className="popup-content">
        <h3>Add {categoryType} Category</h3>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentCategoryId">Parent Category (Optional):</label>
          <select
            id="parentCategoryId"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option value="">None</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="popup-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </Popup>
  );
}

export default AddCategoryPopup;
