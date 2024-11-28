//TransactionsTable.js

import React from 'react';
import './TransactionsTable.css';

function TransactionsTable({ transactions, accounts }) {
  return (
    <>
      <h2>Transactions Report</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Number</th>
            <th>Description</th>
            <th>Account</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.number}</td>
                <td>{transaction.description}</td>
                <td>{accounts.find(account => account.id === transaction.account_id)?.name}</td>
                <td>{transaction.category}</td>
                <td>{new Intl.NumberFormat().format(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TransactionsTable;
