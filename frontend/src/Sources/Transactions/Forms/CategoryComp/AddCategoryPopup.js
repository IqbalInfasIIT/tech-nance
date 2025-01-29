import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './AddCategoryPopup.css';

function AddCategoryPopup({ open, handleClose, type, categories, addCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSave = async () => {
    const newCategory = {
      name: categoryName,
      parentCategoryId: parentCategoryId || null,
      isActive: true
    };

    try {
      await addCategory(newCategory, type);
      setCategoryName('');
      setParentCategoryId('');
      setIsActive(true);
      handleClose();
    } catch (error) {
      console.error(`Error adding ${type} category:`, error);
      alert(`Error adding ${type} category. Please try again.`);
    }
  };

  return (
    <Popup open={open} closeOnDocumentClick onClose={handleClose}>
      <div className="popup-content">
        <h3>Add {type.charAt(0).toUpperCase() + type.slice(1)} Category</h3>
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
          <button 
            onClick={handleSave} 
            disabled={!categoryName.trim()} // Disable if category name is empty
            aria-label="Save Category"
          >
            Save
          </button>
          <button 
            onClick={handleClose} 
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default AddCategoryPopup;
