//PieChartDisplay.js

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './PieChartDisplay.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function PieChartDisplay({ totals }) {
  const data = [
    { name: 'Rent', value: isNaN(totals.rent) ? 0 : totals.rent },
    { name: 'Food', value: isNaN(totals.food) ? 0 : totals.food },
    { name: 'Travel', value: isNaN(totals.travel) ? 0 : totals.travel },
    { name: 'Personal', value: isNaN(totals.personal) ? 0 : totals.personal },
  ];

  // Filter out categories with zero value
  const filteredData = data.filter(item => item.value > 0);

  const totalExpenses = filteredData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="chart-totals">
      <div className="chart-container">
        {filteredData.length > 0 ? (
          <PieChart width={window.innerWidth * 0.4} height={window.innerHeight * 0.4}>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              className="custom-pie-chart"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No data available for the pie chart</p>
        )}
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
  );
}

export default PieChartDisplay;
