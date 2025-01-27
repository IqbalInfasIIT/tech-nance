function IncomeForm({ formData, handleInputChange, incomeCategories }) {

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    handleInputChange({ target: { name: 'destinationId', value: value } });
    handleInputChange({ target: { name: 'destinationType', value: 'income_category' } });
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Source of Income:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleCategoryChange} required>
        <option value="">Select an income category</option>
        {incomeCategories.map(category => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default IncomeForm;