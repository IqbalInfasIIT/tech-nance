import React from 'react';

function AmountInput({ amount, setAmount, error, setError }) {
  const handleAmountChange = (e) => {
    const value = e.target.value;
    const numberValue = Number(value.replace(/,/g, ''));

    if (Number.isInteger(numberValue) && numberValue > 0) {
      setError('');
      const formattedValue = new Intl.NumberFormat().format(numberValue);
      setAmount(formattedValue);
    } else {
      setError('Please enter a positive integer amount.');
    }
  };

  return (
    <div>
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
