import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addSource, getBankAccounts } from '../Services/SourcesApi';
import './AddSourceScreen.css';


function AddSourceScreen() {
  const { type } = useParams();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [linkedAccountId, setLinkedAccountId] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [duration, setDuration] = useState(30);
  const [cycleEndDate, setCycleEndDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const [isBankAccount, setIsBankAccount] = useState(false);
  const [cardType, setCardType] = useState('debit');

  const [bankAccounts, setBankAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateMaxDate = () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + parseInt(duration, 10));
      return currentDate.toISOString().split('T')[0];
    };

    setMaxDate(calculateMaxDate());
  }, [duration]);

  useEffect(() => {
    if (type === 'Card' || type === 'Digital') {
      const fetchBankAccounts = async () => {
        try {
          const data = await getBankAccounts();
          console.log(data);
          setBankAccounts(data);
        } catch (error) {
          console.error('Error fetching bank accounts:', error);
        }
      };
      fetchBankAccounts();
    }
  }, [type]);

  const handleAddSource = async (e) => {
    e.preventDefault();
    const newSource = {
      sourceType: type,
      sourceName: name,
      balance: type === 'Account'? parseFloat(balance) : 0,
      linkedAccountId: (type === 'Card' && cardType === 'debit') || type === 'Digital' ? linkedAccountId : null,
      creditLimit: type === 'Card' && cardType === 'credit' ? parseFloat(creditLimit) : null,
      cycleEndDate: type === 'Card' && cardType === 'credit' ? cycleEndDate : null,
      isBankAccount: type === 'Account' ? isBankAccount : false
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
        {type === 'Card' && (
          <div className='select-radio'>
            <label>
              <input
                type="radio"
                value="debit"
                checked={cardType === 'debit'}
                onChange={() => setCardType('debit')}
              />
              Debit
            </label>
            <label>
              <input
                type="radio"
                value="credit"
                checked={cardType === 'credit'}
                onChange={() => setCardType('credit')}
              />
              Credit
            </label>
          </div>
        )}
        {type === 'Account' && (
          <div className='select-radio'>
            <label>
              <input
                type="radio"
                value="cash"
                checked={isBankAccount === false}
                onChange={() => setIsBankAccount(false)}
              />
              Cash Account
            </label>
            <label>
              <input
                type="radio"
                value="bank"
                checked={isBankAccount === true}
                onChange={() => setIsBankAccount(true)}
              />
              Bank Account
            </label>
          </div>
        )}
        <label className='main-label'>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${type} Name`}
          required
        />
        {(type === 'Account' || type === 'Voucher' || type === "Gift") && (
          <>
            <label className='main-label'>Initial Balance: </label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Initial Balance"
              required
            />
          </>
        )}
        {((type === 'Card' && cardType === 'debit') || type === 'Digital') && (
          <>
            <label className='main-label'>Linked Account: </label>
            <select
              value={linkedAccountId}
              onChange={(e) => setLinkedAccountId(e.target.value)}
              required
            >
              <option value="" disabled>Select Linked Bank Account</option>
              {bankAccounts.map(account => (
                <option key={account.source_id} value={account.source_id}>
                  {account.source_name}
                </option>
              ))}
            </select>
          </>
        )}
        {(type === 'Card' && cardType === 'credit') && (
          <>
            <label className='main-label'>Credit Limit: </label>
            <input
              type="number"
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
              placeholder="Credit Limit"
              required
            />
            <label className='main-label'>Duration: </label>
            <input 
              type="number" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)} 
              required
            />
            <label className='main-label'>Next Cycle Date: </label>
            <input
              type="date"
              value={cycleEndDate}
              onChange={(e) => setCycleEndDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
              max={maxDate}
            />
          </>
        )}
        <button type="submit">Add {type}</button>
      </form>
    </div>
  );
}

export default AddSourceScreen;
