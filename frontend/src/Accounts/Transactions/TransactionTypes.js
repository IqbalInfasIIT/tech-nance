import React from 'react';
import './TransactionTypes.css';

function TransactionTypes({ type, setType }) {
  return (
    <div className="type-selection">
      <button className={type === 'transfer' ? 'active' : ''} onClick={() => setType('transfer')}>Transfer</button>
      <button className={type === 'income' ? 'active' : ''} onClick={() => setType('income')}>Income</button>
      <button className={type === 'expense' ? 'active' : ''} onClick={() => setType('expense')}>Expense</button>
      <button className={type === 'refund' ? 'active' : ''} onClick={() => setType('refund')}>Refund</button>
    </div>
  );
}

export default TransactionTypes;
