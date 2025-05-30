import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getSourceById, getSources } from '../../Services/SourcesApi';
import { getMainCategories, addCategory, deleteCategory, getMainCategoryCount } from '../../Services/CategoryApi';
import { addTransaction } from '../../Services/TransactionsApi';
import './TransactionsScreen.css';
import TransactionTypesView from './Components/TransactionTypesView';
import MainTransactionForm from './MainTransactionForm';

const initialFormData = {
  date: '',
  number: '',
  description: '',
  amount: '',
  source_id: '',
  source_type: '',
  destination_id: '',
  destination_type: '',
  payment_method: ''
};

function TransactionScreen() {
  const { sourceId: sourceIdString } = useParams();
  const sourceId = parseInt(sourceIdString, 10);

  const [source, setSource] = useState(null);
  const [balance, setBalance] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [incomeMainCategoryCount, setIncomeMainCategoryCount] = useState(0);
  const [expenseMainCategoryCount, setExpenseMainCategoryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourceData = await getSourceById(sourceId);
        setSource(sourceData);
        setBalance(sourceData.balance)

        const [
          incomeCats,
          expenseCats,
          bankAccounts,
          incomeCategoryCount,
          expenseCategoryCount
        ] = await Promise.all([
          getMainCategories('income_categories'),
          getMainCategories('expense_categories'),
          getSources(),
          getMainCategoryCount('income_categories'),
          getMainCategoryCount('expense_categories')
        ]);

        setIncomeCategories(incomeCats);
        setExpenseCategories(expenseCats);
        setAccounts(bankAccounts);
        setIncomeMainCategoryCount(incomeCategoryCount.mainCategoryCount);
        setExpenseMainCategoryCount(expenseCategoryCount.mainCategoryCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [sourceId]);

  const handleTypeClick = (type) => {
    setFormData(initialFormData);
    setSelectedType(type);
    let payment_method = 'Cash'; 
    
    if (source) {
      if (source.is_bank_account) {
        payment_method = 'Transfer';
      } else {
        payment_method = 'Cash';
      }
    }
  
    setFormData((prevData) => ({
      ...prevData,
      type: type,
      payment_method: payment_method
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

  const handleDeleteCategory = async (categoryId, categoryType) => {
    try {
      await deleteCategory(categoryId, categoryType);
      if (categoryType === 'income_categories') {
        setIncomeCategories(incomeCategories.filter(category => category.category_id !== categoryId));
      } else {
        setExpenseCategories(expenseCategories.filter(category => category.category_id !== categoryId));
      }
      alert('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Error deleting category. Please try again.');
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
      <TransactionTypesView 
        source={source} 
        handleTypeClick={handleTypeClick} 
        selectedType={selectedType}
        sourceBalance={balance}
      />
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
        sourceId={sourceId}
        accounts={accounts}
        addCategory={handleAddCategory}
        deleteCategory={handleDeleteCategory}
        incomeMainCategoryCount={incomeMainCategoryCount}
        expenseMainCategoryCount={expenseMainCategoryCount}
        sourceBalance={balance}
      />
    </div>
  );
}

export default TransactionScreen;
