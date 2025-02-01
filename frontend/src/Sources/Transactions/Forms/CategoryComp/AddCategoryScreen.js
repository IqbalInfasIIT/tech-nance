import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMainCategories, addCategory } from '../../../../Services/CategoryApi';
import './AddCategoryScreen.css';

function AddCategoryScreen() {
  const { type } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let typeALT = type === 'income_categories' ? 'Income' : 'Expense';
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getMainCategories(type);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error(`Error fetching ${typeALT} categories:`, error);
      }
    };
    fetchCategories();
  }, [type]);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      alert('Category Name cannot be empty');
      return;
    }

    const newCategory = {
      name: categoryName,
      parentCategoryId: parentCategoryId || null,
      isActive: true
    };

    try {
      await addCategory(newCategory, type);
      alert('Category added successfully!');
      setCategoryName('');
      setParentCategoryId('');
      navigate(-1);
    } catch (error) {
      console.error(`Error adding ${type} category:`, error);
      alert(`Error adding ${type} category. Please try again.`);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-category-container">
      <h3>Add {type === 'income_categories' ? 'Income' : 'Expense'} Category</h3>
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
      <div className="button-group">
        <button onClick={handleSave}>Add</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddCategoryScreen;
