import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSources, deleteSource } from '../Services/SourcesApi';
import './SourcesScreen.css';

function SourcesScreen() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSources();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching sources:', error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (sourceId) => {
    navigate(`/transactions/${sourceId}`);
  };  

  const handleDeleteSourceClick = async (sourceId) => {
    const confirmed = window.confirm("Are you sure you want to delete this source?");
    if (confirmed) {
      try {
        await deleteSource(sourceId);
        setAccounts(accounts.filter(account => account.source_id !== sourceId));
        alert("Source deleted successfully");
      } catch (error) {
        console.error('Error deleting source:', error);
        alert(error.response ? error.response.data : 'Error deleting source');
      }
    }
  };

  return (
    <div className="s-main-container">
      <div className="s-left-panel">
        <h3>Accounts</h3>
        <div className="s-account-list">
          {accounts.map(account => (
            <div key={account.source_id} className="s-account-card" onClick={() => handleCardClick(account.source_id)}>
              <div className="s-account-row">
                <h3>{account.is_bank_account ? 'Bank' : 'Cash'}: {account.source_name}</h3>
                {account.bank_number && (
                  <p>{account.bank_number}</p>
                )}
              </div>
              <div className="s-account-row">
                <p>Balance: {new Intl.NumberFormat().format(account.balance)}</p>
              </div>
              <div className="s-delete-row">
                <button className="s-button" onClick={(e) => {e.stopPropagation(); handleDeleteSourceClick(account.source_id);}}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="s-add-account" onClick={() => navigate('/add-source/Account')}>
            <h3>Add Account</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SourcesScreen;
