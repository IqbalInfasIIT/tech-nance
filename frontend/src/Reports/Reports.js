//Reports.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccountButtons from './AccountButtons';
import PieChartDisplay from './PieChartDisplay';
import TransactionsTable from './TransactionsTable';
import './Reports.css';

function Reports() {
  const [accounts, setAccounts] = useState([]);
  const [totals, setTotals] = useState({ rent: 0, food: 0, travel: 0, personal: 0 });
  const [transactions, setTransactions] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('all');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get-accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const totalsResponse = await axios.get('http://localhost:3001/totals');
      setTotals(totalsResponse.data);

      const transactionsResponse = await axios.get('http://localhost:3001/sorted-transactions');
      setTransactions(transactionsResponse.data);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  const fetchAccountData = async (accountId) => {
    try {
      const totalsResponse = await axios.get(`http://localhost:3001/totals/${accountId}`);
      setTotals(totalsResponse.data);

      const transactionsResponse = await axios.get(`http://localhost:3001/sorted-transactions/${accountId}`);
      setTransactions(transactionsResponse.data.length ? transactionsResponse.data : []);
      setSelectedAccountId(accountId);
    } catch (error) {
      console.error('Error fetching account data:', error);
      setTransactions([]);
      setSelectedAccountId(accountId);
    }
  };

  const handleAllClick = () => {
    setSelectedAccountId('all');
    fetchAllData();
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <PieChartDisplay totals={totals} />
      <div className="accounts-buttons">
        <button
          onClick={handleAllClick}
          className={`all-button ${selectedAccountId === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <div className="account-buttons-row">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => fetchAccountData(account.id)}
              className={`account-button ${selectedAccountId === account.id ? 'active' : ''}`}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>
      <TransactionsTable transactions={transactions} accounts={accounts} />
    </div>
  );
}

export default Reports;
