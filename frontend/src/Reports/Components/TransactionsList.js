import React from 'react';
import './TransactionsList.css';

const TransactionsList = ({ transactions }) => {
    return (
        <table className='t-table'>
            <thead>
                <tr>
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
                    const rowClass = transaction.type.toLowerCase();
                    return (
                        <tr key={index} className={rowClass}>
                            <td className="col-date" data-full-text={transaction.date}>{transaction.date}</td>
                            <td className="col-number" data-full-text={transaction.number}>{transaction.number}</td>
                            <td className="col-description" data-full-text={transaction.description}>{transaction.description}</td>
                            <td className="col-type" data-full-text={transaction.type}>{transaction.type}</td>
                            <td className="col-from" data-full-text={transaction.source_name}>{transaction.source_name}</td>
                            <td className="col-to" data-full-text={transaction.destination_name}>{transaction.destination_name}</td>
                            <td className="col-amount" data-full-text={transaction.amount}>{transaction.amount}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TransactionsList;