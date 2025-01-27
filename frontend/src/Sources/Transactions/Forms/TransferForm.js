function TransferForm({ formData, handleInputChange, accounts, wallets }) {

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
          <option key={account.source_id} value={account.source_id}>
            {account.source_name}
          </option>
        ))}
        {wallets.map(wallet => (
          <option key={wallet.source_id} value={wallet.source_id}>
            {wallet.source_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TransferForm;
