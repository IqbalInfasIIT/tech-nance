import React from 'react';
import './TransactionTypesView.css';

function TransactionTypesView({ source, handleTypeClick, selectedType }) {
  return (
    <div className="type-selection">
      {source && source.source_type === 'Account' && (
        <>
          <button
            className={`type-button ${selectedType === 'transfer' ? 'active' : ''}`}
            onClick={() => handleTypeClick('transfer')}
          >
            Transfer
          </button>
          <button
            className={`type-button ${selectedType === 'income' ? 'active' : ''}`}
            onClick={() => handleTypeClick('income')}
          >
            Income
          </button>
          <button
            className={`type-button ${selectedType === 'expense' ? 'active' : ''}`}
            onClick={() => handleTypeClick('expense')}
          >
            Expense
          </button>
          <button
            className={`type-button ${selectedType === 'refund' ? 'active' : ''}`}
            onClick={() => handleTypeClick('refund')}
          >
            Refund
          </button>
        </>
      )}
    </div>
  );
}

export default TransactionTypesView;
