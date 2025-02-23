import React from 'react';
import './TransactionTypesView.css';

function TransactionTypesView({ source, handleTypeClick, selectedType, sourceBalance }) {
  return (
    <div className="type-selection">
      {source && source.source_type === 'Account' && (
        <>
          <button
            className={`type-button ${selectedType === 'transfer' ? 'active' : ''} ${sourceBalance === 0 ? 'disabled' : ''}`}
            onClick={() => handleTypeClick('transfer')}
            disabled={sourceBalance == 0}
          >
          <span>Transfer</span>
          {sourceBalance == 0 && <span className="insufficient-balance">Insufficient balance</span>}
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
            disabled={sourceBalance == 0}
          >
          <span>Expense</span>
          {sourceBalance == 0 && <span className="insufficient-balance">Insufficient balance</span>}
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
