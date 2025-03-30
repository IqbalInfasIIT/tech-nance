import React, { useEffect, useState } from 'react';
import IncomeForm from './Forms/IncomeForm';
import TransferForm from './Forms/TransferForm';
import ExpenseForm from './Forms/ExpenseForm';
import RefundForm from './Forms/RefundForm';
import AmountInput from './Components/AmountInputView';

function MainTransactionForm({ 
  selectedType, formData, handleInputChange, handleFormSubmit, incomeCategories, expenseCategories, accounts, deleteCategory, 
  incomeMainCategoryCount, expenseMainCategoryCount, sourceId, sourceBalance
}) {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (!formData.date) {
      const currentDate = new Date().toISOString().split('T')[0];
      handleInputChange({ target: { name: 'date', value: currentDate } });
    }
  }, [formData.date, handleInputChange]);

  useEffect(() => {
    handleInputChange({ target: { name: 'amount', value: amount.replace(/,/g, '') } });
  }, [amount, handleInputChange]);

  useEffect(() => {
    setAmount('');
  }, [selectedType]);

  if (!selectedType) {
    return null;
  }
  return (
    <div className="transactions-container">
      <form className="transaction-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input type="text" id="number" name="number" value={formData.number} onChange={handleInputChange} maxLength={10} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        {selectedType === 'transfer' && (
          <TransferForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            accounts={accounts} 
            sourceId={sourceId}
          />
        )}
        {selectedType === 'income' && (
          <IncomeForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            incomeCategories={incomeCategories} 
            deleteCategory={deleteCategory} 
            incomeMainCategoryCount={incomeMainCategoryCount}
            sourceId={sourceId}
          />
        )}
        {selectedType === 'expense' && (
          <ExpenseForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            expenseCategories={expenseCategories} 
            deleteCategory={deleteCategory} 
            expenseMainCategoryCount={expenseMainCategoryCount}
            sourceId={sourceId}
          />
        )}
        {selectedType === 'refund' && (
          <RefundForm 
            handleInputChange={handleInputChange} 
            expenseCategories={expenseCategories}
            sourceId={sourceId}
          />
        )}
        <div className="form-group full-width">
          <label htmlFor="amount">Amount:</label>
          <AmountInput 
            amount={amount} 
            setAmount={setAmount} 
            error={amountError} 
            setError={setAmountError} 
            sourceBalance={selectedType !== 'refund' && selectedType !== 'income' ? sourceBalance : undefined}
          />
        </div>
        <div className="spanwid">
          <button type="submit" className="add-transaction-button">Add Transaction</button>
        </div>
      </form>
    </div>
  );
}
export default MainTransactionForm;
