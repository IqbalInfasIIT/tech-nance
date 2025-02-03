import React, { useEffect } from 'react';

function TransferForm({ formData, handleInputChange, accounts, sourceId }) {
  
    useEffect(() => {
      handleInputChange({ target: { name: 'sourceId', value: sourceId } });
      handleInputChange({ target: { name: 'sourceType', value: 'source' } });
    }, [sourceId, handleInputChange]);

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
