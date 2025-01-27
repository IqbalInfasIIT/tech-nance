import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getSourceById, getBankAccounts, getDigitalWallets, getCreditCards } from '../../Services/SourcesApi';
import { getIncomeCategories, getExpenseCategories } from '../../Services/CategoryApi';
import { addTransaction } from '../../Services/TransactionsApi';
import './TransactionsScreen.css';
import TransactionTypesView from './Components/TransactionTypesView';
import MainTransactionForm from './MainTransactionForm';

const initialFormData = {
  date: '',
  number: '',
  description: '',
  type: '',
  amount: '',
  sourceId: '',
  sourceType: '',
  destinationId: '',
  destinationType: '',
  paymentMethod: ''
};

function TransactionScreen() {
  const { sourceId } = useParams();
  const [source, setSource] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [creditCards, setCreditCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourceData = await getSourceById(sourceId);
        setSource(sourceData);

        const [incomeCats, expenseCats, bankAccounts, digitalWallets, creditCards] = await Promise.all([
          getIncomeCategories(),
          getExpenseCategories(),
          getBankAccounts(),
          getDigitalWallets(),
          getCreditCards(),
        ]);

        setIncomeCategories(incomeCats);
        setExpenseCategories(expenseCats);
        setAccounts(bankAccounts);
        setWallets(digitalWallets);
        setCreditCards(creditCards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [sourceId]);

  const handleTypeClick = (type) => {
    setFormData(initialFormData);
    setSelectedType(type);
    let paymentMethod = 'Cash'; 
    
    if (source) {
      if (source.is_bank_account) {
        paymentMethod = 'Transfer';
      } else if (source.source_type === 'Digital') {
        paymentMethod = 'Digital';
      } else if (source.source_type === 'Card' && source.linked_account_id !== null) {
        paymentMethod = 'Debit';
      } else if (source.cycle_end_date) {
        paymentMethod = 'Credit';
      } else if (source.source_type === 'Gift') {
        paymentMethod = 'Voucher';
      } else {
        paymentMethod = 'Cash';
      }
    }
  
    setFormData((prevData) => ({
      ...prevData,
      type: type,
      sourceId: sourceId,
      sourceType: 'source',
      paymentMethod: paymentMethod
    }));
  };  
  
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransaction(formData);
  
      if (response.status === 201) {
        alert('Transaction added successfully!');
        setFormData(initialFormData);
        setSelectedType('');
      } else {
        alert(`Error adding transaction: ${response.message || 'Please try again.'}, Code: ${response.status}`);
        setFormData(initialFormData);
        setSelectedType('');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction. Please try again.');
      setFormData(initialFormData);
      setSelectedType('');
    }
  };
  
  return (
    <div className="transaction-container">
      <h2>Select Transaction Type</h2>
      {source && (
        <>
          <h3>Selected Source: {source.source_name}</h3>
        </>
      )}
      <TransactionTypesView source={source} handleTypeClick={handleTypeClick} selectedType={selectedType}  />
      {selectedType && (
        <>
          <h3>Selected Type: {selectedType}</h3>
        </>
      )}
      <MainTransactionForm
        selectedType={selectedType}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        incomeCategories={incomeCategories}
        expenseCategories={expenseCategories}
        accounts={accounts}
        wallets={wallets}
        creditCards={creditCards}
      />
    </div>
  );
}

export default TransactionScreen;
