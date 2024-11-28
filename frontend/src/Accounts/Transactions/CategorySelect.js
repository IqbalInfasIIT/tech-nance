import React from 'react';

function CategorySelect({ type, category, setCategory, incomeCategories, expenseCategories }) {
  const categories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}

export default CategorySelect;
