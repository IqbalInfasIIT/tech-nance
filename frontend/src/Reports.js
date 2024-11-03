import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Reports.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ rent: 0, food: 0, travel: 0, personal: 0 });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const totalsResponse = await axios.get('http://localhost:3001/totals');
        setTotals(totalsResponse.data);

        const sortedTransactionsResponse = await axios.get('http://localhost:3001/sorted-transactions');
        setTransactions(sortedTransactionsResponse.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const data = [
    { name: 'Rent', value: totals.rent },
    { name: 'Food', value: totals.food },
    { name: 'Travel', value: totals.travel },
    { name: 'Personal', value: totals.personal },
  ];

  const totalExpenses = Object.values(totals).reduce((acc, curr) => acc + (isNaN(curr) ? 0 : curr), 0);

  return (
    <div className="reports-container">
      <div className="chart-totals">
        <div className="chart-container">
          <PieChart width={window.innerWidth * 0.4} height={window.innerHeight * 0.4}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              className="custom-pie-chart"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="totals-list">
          <h3>Category Totals</h3>
          <ul>
            <li>Rent: {new Intl.NumberFormat().format(totals.rent)}</li>
            <li>Food: {new Intl.NumberFormat().format(totals.food)}</li>
            <li>Travel: {new Intl.NumberFormat().format(totals.travel)}</li>
            <li>Personal: {new Intl.NumberFormat().format(totals.personal)}</li>
          </ul>
          <h3>Total Expenses: {new Intl.NumberFormat().format(totalExpenses)}</h3>
        </div>
      </div>
      
      <h2>Transactions Report</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{new Intl.NumberFormat().format(transaction.amount)}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
