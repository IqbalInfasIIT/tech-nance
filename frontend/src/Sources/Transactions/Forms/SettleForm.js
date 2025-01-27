function SettleForm({ formData, handleInputChange, creditCards }) {

  const handleCardChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    handleInputChange({ target: { name: 'destinationId', value: value } });
    handleInputChange({ target: { name: 'destinationType', value: 'source' } });
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Credit Card:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleCardChange} required>
        <option value="">Select a Credit Card</option>
        {creditCards.map(card => (
          <option key={card.source_id} value={card.source_id}>
            {card.source_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SettleForm;