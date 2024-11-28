//AddAccount.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Accounts.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/accounts/get-accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleAccountClick = (accountId) => {
    navigate(`/transactions/${accountId}`);
  };

  const handleAddAccountClick = () => {
    navigate('/add-account');
  };

  const handleDeleteAccountClick = async (accountId) => {
    const confirmed = window.confirm("Are you sure you want to delete this account?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/accounts/${accountId}`);
        setAccounts(accounts.filter(account => account.account_id !== accountId));
        alert("Account deleted successfully");
      } catch (error) {
        console.error('Error deleting account:', error);
        alert("Error deleting account");
      }
    }
  };

  return (
    <div className="accounts-container">
      <h2>Accounts</h2>
      <div className="account-cards">
        {accounts.map(account => (
          <div key={account.account_id} className="account-card" onClick={() => handleAccountClick(account.account_id)}>
            <h3>{account.account_name}</h3>
            <p>Balance: {new Intl.NumberFormat().format(account.balance)}</p>
            <button className="delete-account-button" onClick={(e) => {
              e.stopPropagation();
              handleDeleteAccountClick(account.account_id);
            }}>
              Delete Account
            </button>
          </div>
        ))}
        <div className="account-card add-account-card" onClick={handleAddAccountClick}>
          <h3>Add Account</h3>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
