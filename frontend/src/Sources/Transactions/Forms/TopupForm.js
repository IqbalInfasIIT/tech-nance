function TopupForm({ formData, handleInputChange, wallets }) {

  const handleWalletChange = (e) => {
    const { value } = e.target;
    handleInputChange(e);
    handleInputChange({ target: { name: 'destinationId', value: value } });
    handleInputChange({ target: { name: 'destinationType', value: 'source' } });
  };

  return (
    <div className="form-group full-width">
      <label htmlFor="destinationId">Digital Wallet:</label>
      <select id="destinationId" name="destinationId" value={formData.destinationId} onChange={handleWalletChange} required>
        <option value="">Select a digital wallet</option>
        {wallets.map(wallet => (
          <option key={wallet.source_id} value={wallet.source_id}>
            {wallet.source_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TopupForm;