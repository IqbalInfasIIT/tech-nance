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
          {source.is_bank_account ? (
            <><button
              className={`type-button ${selectedType === 'topup' ? 'active' : ''}`}
              onClick={() => handleTypeClick('topup')}
            >
              TopUp Wallets
            </button><button
              className={`type-button ${selectedType === 'settle' ? 'active' : ''}`}
              onClick={() => handleTypeClick('settle')}
            >
                Settle Credit
              </button></>
          ) : null }
        </>
      )}
      {source && source.source_type === 'Card' && (
        <>
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
      {source && source.source_type === 'Digital' && (
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
      {source && source.source_type === 'Gift' && (
        <>
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
