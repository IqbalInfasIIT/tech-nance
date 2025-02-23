import React from 'react';

function AmountInput({ amount, setAmount, error, setError, sourceBalance }) {
  const handleAmountChange = (e) => {
    const value = e.target.value;
    const numberValue = Number(value.replace(/,/g, ''));

    if (numberValue > 0 && numberValue <= sourceBalance) {
      setError('');
      setAmount(new Intl.NumberFormat().format(numberValue));
    } else if (numberValue > sourceBalance) {
      setError('Insufficient balance.');
    } else {
      setError('Please enter a positive amount.');
    }
  };


  return (
    <div className="form-group full-width">
      <input
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Amount"
        required
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AmountInput;
