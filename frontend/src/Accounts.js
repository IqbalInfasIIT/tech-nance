import React, { useState } from 'react';
import axios from 'axios';
import './Accounts.css';

function Accounts() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    if (!isNaN(value)) {
      const formattedValue = new Intl.NumberFormat().format(value);
      setAmount(formattedValue);
    }
  };

  const addTransaction = async () => {
    const newTransaction = { amount: parseFloat(amount.replace(/,/g, '')), category };
    try {
      await axios.post('http://localhost:3001/add-transaction', newTransaction);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTransaction();
  };

  return (
    <div className="accounts-container">
      <h2>Accounts</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="rent">Rent</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="personal">Personal</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default Accounts;
