import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CustomLineChart.css';

const tickFormatter = (value) => {
  return value.toLocaleString();
}

const CustomLineChart = ({ data }) => {
  const formattedData = data.map(item => ({
    date: `${item.year}-${String(item.month).padStart(2, '0')}`,
    total_income: parseFloat(item.total_income),
    total_expenses: parseFloat(item.total_expenses)
  }));

  return (
  <div className="line-chart">
    <ResponsiveContainer width="90%" height="100%">
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={tickFormatter} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_income" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="total_expenses" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  );
};

export default CustomLineChart;
