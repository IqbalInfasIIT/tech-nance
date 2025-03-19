import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ReportsCustomPieChart.css';

const COLORS = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#000000'];

const ReportsCustomPieChart = ({ data, labels }) => {
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index]
  }));

  return (
    <div className="r-pie-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) =>
              value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }
          />
          <Legend 
            formatter={(value) => `${value}`}
            iconSize={10}
            align="center"
            layout='horizontal'
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportsCustomPieChart;