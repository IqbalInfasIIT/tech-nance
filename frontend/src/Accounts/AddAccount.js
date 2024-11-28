//AddAccount.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddAccount.css';

function AddAccount() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const navigate = useNavigate();

  const handleAddAccount = async (e) => {
    e.preventDefault();
    const newAccount = { name, balance: parseFloat(balance) };
    try {
      await axios.post('http://localhost:3001/accounts/add-account', newAccount);
      alert('Account added successfully');
      navigate('/accounts');
    } catch (error) {
      console.error('Error adding account:', error);
      alert('Error adding account');
    }
  };

  return (
    <div className="add-account-container">
      <h2>Add New Account</h2>
      <form onSubmit={handleAddAccount} className="add-account-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Account Name"
          required
        />
        <input
          type="text"
          inputMode="numeric"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Initial Balance"
          required
        />
        <button type="submit">Add Account</button>
      </form>
    </div>
  );
}

export default AddAccount;
