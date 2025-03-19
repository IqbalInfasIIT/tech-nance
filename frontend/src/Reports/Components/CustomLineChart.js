import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';
import './CustomLineChart.css';

const tickFormatter = (value) => {
  return value.toLocaleString();
};

const CustomLineChart = ({ fullRange, currentMonth }) => {
  const formattedData = fullRange.map(item => {
    const formattedDate = `${item.year}-${String(item.month).padStart(2, '0')}`;
    const isActive = currentMonth.some(current => current.year === item.year && current.month === item.month);

    return {
      fullRange: formattedDate,
      total_income: parseFloat(item.total_income),
      total_expenses: parseFloat(item.total_expenses),
      isActive: isActive,
    };
  });

  const CustomDot = (props) => {
    if (props.payload.isActive) {
      return <Dot {...props} r={8} />;
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0 && payload[0].payload.isActive) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">{`Income: ${payload[0].payload.total_income.toLocaleString()}`}</p>
          <p className="intro">{`Expenses: ${payload[0].payload.total_expenses.toLocaleString()}`}</p>
        </div>
      );
    } else {
      return(
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
        </div>
      )
    }
  };

  return (
    <div className="line-chart">
      <ResponsiveContainer width="90%" height="90%">
        <LineChart data={formattedData}>
          <XAxis dataKey="fullRange" tick={{ fontSize: 12 }}/>
          <YAxis tickFormatter={tickFormatter} tick={{ fontSize: 12 }}/>
          <Legend />
          <Line
            type="linear"
            dataKey="total_income"
            stroke="#8884d8"
            dot={<CustomDot />}
          />
          <Line
            type="linear"
            dataKey="total_expenses"
            stroke="#82ca9d"
            dot={<CustomDot />}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;