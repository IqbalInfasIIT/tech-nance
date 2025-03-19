import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './BudgetsRadialBarChart.css';

const BudgetsRadialBarChart = ({ totalAmount, totalTarget }) => {
  const difference = totalAmount - totalTarget;
  const isOverspent = totalAmount > totalTarget;

  const data = [
    {
      name: `Target: ${totalTarget.toLocaleString()}`,
      value: totalTarget,
      fill: '#f44336',
    },
    {
      name: `Spent: ${totalAmount.toLocaleString()}`,
      value: totalAmount,
      fill: '#32CD32',
    },
  ];

  return (
    <div>
        <div className="bs-radial-bar-chart">
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="100%"
                    barSize={20}
                    data={data}
                    startAngle={225}
                    endAngle={-45}
                >
                <RadialBar dataKey="value" background clockwise />
                <Legend
                    iconSize={12}
                    iconType='circle'
                    layout="horizontal"
                    align="center"
                />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
        <div className={`chart-status ${isOverspent ? 'overspent' : 'saved'}`} >
            {isOverspent
                ? `Overspent by: ${Math.abs(difference).toLocaleString()}`
                : `Saved: ${Math.abs(difference).toLocaleString()}`}
        </div>
    </div>
  );
};

export default BudgetsRadialBarChart;
