import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './CategoryPopup.css';
import { getLinkedCategories } from '../../../../Services/CategoryApi';

function CategoryPopup({ open, handleClose, type, categories, onSelect, onDelete, showDelete = true, count }) {
  const [subCategories, setSubCategories] = useState({});

  useEffect(() => {
    const fetchSubCategories = async (mainCatId) => {
      try {
        const subCats = await getLinkedCategories(type, mainCatId);
        setSubCategories((prevSubCategories) => ({
          ...prevSubCategories,
          [mainCatId]: subCats,
        }));
      } catch (error) {
        console.error(`Error fetching linked categories:`, error);
      }
    };

    if (open) {
      categories.forEach((mainCat) => {
        fetchSubCategories(mainCat.category_id);
      });
    }
  }, [open, type, categories]);

  const handleDelete = (categoryId) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      onDelete(categoryId);
    }
  }

  return (
    <Popup open={open} closeOnDocumentClick onClose={handleClose}>
      <div className="popup-data">
        <ul className="category-list">
        {showDelete && (
          <li>Current Number of Main Categories: {count} / 10</li>
        )}
          {categories.map((mainCat) => (
            <li key={mainCat.category_id} className="category-item main-category">
              <div className="main-category-header">
                <span>{mainCat.category_name}</span>
                { showDelete && (
                  <button type="button" className="delete-button-main" onClick={() => handleDelete(mainCat.category_id)}>Delete</button>
                )}
              </div>
              <ul className="subcategory-list">
                {subCategories[mainCat.category_id]?.map((subCat) => (
                  <li
                    key={subCat.category_id}
                    className="subcategory-item"
                    onClick={() => {
                      onSelect(subCat.category_id, subCat.category_name);
                      handleClose();
                    }}
                  >
                    <div className="clickable-box">{subCat.category_name}</div>
                    {showDelete ? (
                      <button
                      type="button"
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(subCat.category_id);
                      }}
                    >
                      Delete
                    </button>
                    ) :
                      <div className="icon-placeholder">➕</div>
                    }
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="popup-buttons">
          <button className="close-button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </Popup>
  );
}

export default CategoryPopup;
