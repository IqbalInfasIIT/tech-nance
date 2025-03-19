import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BudgetsCustomPieChart.css';

const BudgetsCustomPieChart = ({ data, labels }) => {
  const total = data.reduce((sum, value) => sum + parseFloat(value), 0);
  const chartData = labels.map((label, index) => ({
    name: `${label} (${((parseFloat(data[index]) / total) * 100).toFixed(1)}%)`,
    value: parseFloat(data[index]),
  }));

  const generateColors = (length) =>
    Array.from({ length }, () =>
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    );

  const dynamicColors = generateColors(chartData.length);

  if (!chartData.length || chartData.some(item => isNaN(item.value))) {
    console.error('Invalid chart data:', chartData);
    return <p>No data available to render the chart</p>;
  }

  return (
    <div className="bs-pie-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius="70%"
            fill="#8884d8"
            dataKey="value"
            isAnimationActive="true"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={dynamicColors[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetsCustomPieChart;
