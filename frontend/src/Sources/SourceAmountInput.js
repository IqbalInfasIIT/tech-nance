import React from 'react';

function SourceAmountInput({ amount, setAmount, error, setError }) {
  
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const numberValue = Number(value);

    if (numberValue > 0) {
      setError("");
      setAmount(new Intl.NumberFormat().format(numberValue));
    } else {
      setError("Please enter a positive amount.");
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
      {error && <p className="abs-error">{error}</p>}
    </div>
  );
}

export default SourceAmountInput;
