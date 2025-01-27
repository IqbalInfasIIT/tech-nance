function RefundForm({ formData, handleInputChange, expenseCategories }) {

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    handleInputChange({ target: { name: 'destinationId', value: value } });
    handleInputChange({ target: { name: 'destinationType', value: 'expense_category' } });
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Expense Category:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleCategoryChange} required>
        <option value="">Select an expense category</option>
        {expenseCategories.map(category => (
          <option key={category.category_id} value={category.category_id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RefundForm;