import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addSource } from '../Services/SourcesApi';
import './AddSourceScreen.css';

function AddSourceScreen() {
  const { type } = useParams();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [isBank, setIsBank] = useState(false);
  const [bankNumber, setBankNumber] = useState('');
  const navigate = useNavigate();

  const handleAddSource = async (e) => {
    e.preventDefault();
    const newSource = {
      sourceType: 'Account',
      sourceName: name,
      balance: parseFloat(balance) || 0,
      isBankAccount: isBank,
      bankNumber: isBank ? bankNumber : null
    };
    try {
      await addSource(newSource);
      alert(`${type} added successfully`);
      navigate('/sources');
    } catch (error) {
      console.error(`Error adding ${type.toLowerCase()}:`, error);
      alert(`Error adding ${type.toLowerCase()}`);
    }
  };

  return (
    <div className="add-source-container">
      <h2>Add New {type}</h2>
      <form onSubmit={handleAddSource} className="add-source-form">
        <label className='main-label'>Type: </label>
        <div className='select-radio'>
          <label htmlFor="cash">
          <input
            type="radio"
            id="cash"
            name="type"
            value="Cash"
            checked={!isBank}
            onChange={() => setIsBank(false)}
          />
            Cash
          </label>
          <label htmlFor="bank">
          <input
            type="radio"
            id="bank"
            name="type"
            value="Bank"
            checked={isBank}
            onChange={() => setIsBank(true)}
          />
            Bank
            </label>
        </div>
        {isBank && (
          <>
            <label className='main-label'>Bank Number: </label>
            <input
              type="text"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
              placeholder="Bank Number"
              maxLength={50}
              required
            />
          </>
        )}
        <label className='main-label'>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${type} Name`}
          maxLength={255}
          required
        />
        <label className='main-label'>Initial Balance: </label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Initial Balance"
          required
        />
        <button type="submit">Add {type}</button>
      </form>
    </div>
  );
}

export default AddSourceScreen;
