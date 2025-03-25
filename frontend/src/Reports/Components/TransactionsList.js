import React from 'react';
import './TransactionsList.css';

const TransactionsList = ({ transactions, handleDeleteTransaction }) => {

    if ((!transactions || transactions.length === 0)) {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height:'100%',
              width: '100%'
            }}
          >
            No Data
          </div>
        );
      }

    return (
        <table className='t-table'>
            <thead>
                <tr>
                    <th className="col-delete">Delete</th>
                    <th className="col-date">Date</th>
                    <th className="col-number">Number</th>
                    <th className="col-description">Description</th>
                    <th className="col-type">Type</th>
                    <th className="col-from">From</th>
                    <th className="col-to">To</th>
                    <th className="col-amount">Amount</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => {
                    const rowClass = transaction?.type?.toLowerCase() || "";
                    return (
                        <tr key={index} className={rowClass}>
                            <td className="col-action">
                                <button 
                                    className="trans-delete-button" 
                                    onClick={() => handleDeleteTransaction(transaction.transaction_id)}
                                >
                                </button>
                            </td>
                            <td className="col-date">{transaction.date}</td>
                            <td className="col-number">{transaction.number}</td>
                            <td className="col-description">{transaction.description}</td>
                            <td className="col-type">{transaction.type}</td>
                            <td className="col-from">{transaction.source_name}</td>
                            <td className="col-to">{transaction.destination_name}</td>
                            <td className="col-amount">{transaction.amount}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TransactionsList;
