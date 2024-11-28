//Transactions.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Transactions.css';
import TransactionTypes from './TransactionTypes';
import AmountInput from './AmountInput';
import CategorySelect from './CategorySelect';

function Transactions() {
  const { accountId } = useParams();
  const [accountName, setAccountName] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [category, setCategory] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/accounts/${accountId}`);
        setAccountName(response.data.account_name);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    const fetchIncomeCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/income-categories');
        setIncomeCategories(response.data);
      } catch (error) {
        console.error('Error fetching income categories:', error);
      }
    };

    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/expense-categories');
        setExpenseCategories(response.data);
      } catch (error) {
        console.error('Error fetching expense categories:', error);
      }
    };

    fetchAccountDetails();
    fetchAccounts();
    fetchIncomeCategories();
    fetchExpenseCategories();
  }, [accountId]);

  const resetForm = () => {
    setDate('');
    setNumber('');
    setDescription('');
    setAmount('');
    setToAccount('');
    setCategory('');
    setError('');
  };

  const addTransaction = async () => {
    const newTransaction = {
      date,
      number,
      description,
      type,
      amount: parseFloat(amount.replace(/,/g, '')),
      fromAccount: accountId,
      toAccountOrCategory: type === 'transfer' ? toAccount : category,
    };

    try {
      await axios.post('http://localhost:3001/add-transaction', newTransaction);
      alert('Transaction added successfully');
      resetForm();
      setType('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      addTransaction();
    }
  };

  const handleTypeChange = (newType) => {
    resetForm();
    setType(newType);
  };

  const isFormValid = () => {
    return date && number && description && amount && (
      (type === 'transfer' && toAccount) ||
      ((type === 'income' || type === 'expense' || type === 'refund') && category)
    );
  };

  const getCategoryLabel = () => {
    switch (type) {
      case 'transfer':
        return 'To Account';
      case 'income':
        return 'Income Category';
      case 'expense':
        return 'Expense Category';
      case 'refund':
        return 'Refund Category';
      default:
        return 'Category';
    }
  };

  return (
    <div className="transactions-container">
      <div className="section header">
        <h2>Add Transaction</h2>
        <p>Selected Account: {accountName}</p>
      </div>
      <div className="section buttons">
        <TransactionTypes type={type} setType={handleTypeChange} />
      </div>
      {type && (
        <div className="section form">
          <form onSubmit={handleTransactionSubmit} className="transaction-form">
            <div className="form-group">
              <label htmlFor="dateInput">Date</label>
              <input
                type="date"
                id="dateInput"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numberInput">Number</label>
              <input
                type="text"
                id="numberInput"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionInput">Description</label>
              <input
                type="text"
                id="descriptionInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryInput">{getCategoryLabel()}</label>
              {type === 'transfer' ? (
                <select id="toAccountSelect" value={toAccount} onChange={(e) => setToAccount(e.target.value)} required>
                  <option value="">Select To Account</option>
                  {accounts.map((account) => (
                    <option key={account.account_id} value={account.account_id}>{account.account_name}</option>
                  ))}
                </select>
              ) : (
                <CategorySelect
                  type={type}
                  category={category}
                  setCategory={setCategory}
                  incomeCategories={incomeCategories}
                  expenseCategories={expenseCategories}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="amountInput">Amount</label>
              <AmountInput amount={amount} setAmount={setAmount} error={error} setError={setError} />
            </div>
            <div className="form-group full-width">
              <button type="submit" className="add-transaction-button" disabled={!isFormValid()}>Add Transaction</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Transactions;
