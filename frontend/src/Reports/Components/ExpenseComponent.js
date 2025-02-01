import React, { useState } from 'react';
import CustomPieChart from './CustomPieChart';
import PopupDisplay from './PopupDisplay';
import './IncExpComponent.css';

const ExpenseComponent = ({ totalExpense, breakdown = [] }) => {
  const [showPopup, setShowPopup] = useState(false);

  const top4Categories = breakdown.slice(0, 4);
  const otherCategoriesTotal = breakdown.slice(4).reduce((acc, item) => acc + parseFloat(item.total_amount || 0), 0);

  const data = [
    ...top4Categories.map(item => parseFloat(item.total_amount || 0)),
    ...(otherCategoriesTotal > 0 ? [otherCategoriesTotal] : [])
  ];

  const labels = [
    ...top4Categories.map(item => {
      const amount = parseFloat(item.total_amount || 0);
      return amount > 0 ? item.main_category_name : null;
    }).filter(label => label !== null),
    ...(otherCategoriesTotal > 0 ? ['Other'] : [])
  ];

  return (
    <div className="IncExp-component">
      <h3 className="total-value">
        Total Expenses: {new Intl.NumberFormat(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        }).format(totalExpense)}
      </h3>
      <div className="pie-chart-container">
        <CustomPieChart data={data} labels={labels} />
      </div>
      <button className="details-button" onClick={() => setShowPopup(true)}>
        View Details
      </button>
      <PopupDisplay
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title="Expense Breakdown"
        breakdown={breakdown}
      />
    </div>
  );
};

export default ExpenseComponent;
