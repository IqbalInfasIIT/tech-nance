function TransferForm({ formData, handleInputChange, accounts, sourceId }) {

  const handleTransferChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    handleInputChange({ target: { name: 'destinationId', value: value } });
    handleInputChange({ target: { name: 'destinationType', value: 'source' } });
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Destination:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleTransferChange} required>
        <option value="">Select a Destination</option>
        {accounts.map(account => (
          String(account.source_id) !== String(sourceId) && (
            <option key={account.source_id} value={account.source_id}>
              {account.is_bank_account ? 'Bank' : 'Cash'}: {account.source_name}
            </option>
          )
        ))}
      </select>
    </div>
  );
}

export default TransferForm;
