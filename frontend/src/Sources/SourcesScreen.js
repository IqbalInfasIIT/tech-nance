import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSources, deleteSource } from '../Services/SourcesApi';
import './SourcesScreen.css';

function SourcesScreen() {
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [digitalWallets, setDigitalWallets] = useState([]);
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSources();
        setAccounts(data.filter(source => source.source_type === 'Account'));
        setCards(data.filter(source => source.source_type === 'Card'));
        setDigitalWallets(data.filter(source => source.source_type === 'Digital'));
        setGifts(data.filter(source => source.source_type === 'Gift'));
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
        setCards(cards.filter(card => card.source_id !== sourceId));
        setDigitalWallets(digitalWallets.filter(wallet => wallet.source_id !== sourceId));
        setGifts(gifts.filter(gift => gift.source_id !== sourceId));
        alert("Source deleted successfully");
      } catch (error) {
        console.error('Error deleting source:', error);
        alert(error.response ? error.response.data : 'Error deleting source');
      }
    }
  };

  return (
    <div className="main-container">

      <div className="left-panel">
        <h3>Accounts</h3>
        <div className="account-list">
          {accounts.map(account => (
            <div key={account.source_id} className="account-card" onClick={() => handleCardClick(account.source_id)}>
              <div className="account-row">
                <h3>{account.is_bank_account ? 'Bank' : 'Cash'} : {account.source_name}</h3>
                <p>Balance: {new Intl.NumberFormat().format(account.balance)}</p>
              </div>
              <div className="delete-row">
                <button onClick={(e) => {e.stopPropagation(); handleDeleteSourceClick(account.source_id);}}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="add-account" onClick={() => navigate('/add-source/Account')}>
            <h3>Add Account</h3>
          </div>
        </div>
      </div>

      <div className="right-panel">

        <div className="main-card">
          <h3>Cards</h3>
          <div className="item-list">
            {cards.map(card => (
              <div key={card.source_id} className="item-card" onClick={() => handleCardClick(card.source_id)}>
                      <div className="item-row">
                        <b>{card.cycle_end_date ? 'Credit' : 'Debit'}</b>
                      </div>
                <div className="item-row">{card.source_name}</div>
                <div className="item-row">Balance: {new Intl.NumberFormat().format(card.balance)}</div>
                <div className="item-row">
                  <button onClick={(e) => {e.stopPropagation(); handleDeleteSourceClick(card.source_id);}}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="add-item" onClick={() => navigate('/add-source/Card')}>
              <h3>Add Card</h3>
            </div>
          </div>
        </div>
        
        <div className="main-card">
          <h3>Digital Wallets</h3>
          <div className="item-list">
            {digitalWallets.map(wallet => (
              <div key={wallet.source_id} className="item-card" onClick={() => handleCardClick(wallet.source_id)}>
                <div className="item-row">{wallet.source_name}</div>
                <div className="item-row">Balance: {new Intl.NumberFormat().format(wallet.balance)}</div>
                <div className="item-row">
                  <button onClick={(e) => {e.stopPropagation(); handleDeleteSourceClick(wallet.source_id);}}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="add-item" onClick={() => navigate('/add-source/Digital')}>
              <h3>Add Wallet</h3>
            </div>
          </div>
        </div>

        <div className="main-card">
          <h3>Gifts</h3>
          <div className="item-list">
            {gifts.map(gift => (
              <div key={gift.source_id} className="item-card" onClick={() => handleCardClick(gift.source_id)}>
                <div className="item-row">{gift.source_name}</div>
                <div className="item-row">Balance: {new Intl.NumberFormat().format(gift.balance)}</div>
                <div className="item-row">
                  <button onClick={(e) => {e.stopPropagation(); handleDeleteSourceClick(gift.source_id);}}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <div className="add-item" onClick={() => navigate('/add-source/Gift')}>
              <h3>Add Gift</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourcesScreen;
