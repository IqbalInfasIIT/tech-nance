import React, { useState } from 'react';
import CustomPieChart from './CustomPieChart';
import PopupDisplay from './PopupDisplay';
import './IncExpComponent.css';

const ExpenseComponent = ({ totalExpense, breakdown = [] }) => {
  const [showPopup, setShowPopup] = useState(false);

  const validBreakdown = Array.isArray(breakdown) ? breakdown : [];
  const top4Categories = validBreakdown.slice(0, 4);
  const otherCategoriesTotal = validBreakdown.slice(4).reduce((acc, item) => acc + (parseFloat(item.total_amount) || 0), 0);

  const data = top4Categories.map(item => parseFloat(item.total_amount));
  if (otherCategoriesTotal > 0) {
    data.push(otherCategoriesTotal);
  }

  const labels = top4Categories.map(item => item.category_name);
  if (otherCategoriesTotal > 0) {
    labels.push('Other');
  }

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="IncExp-component"> {/* Add 'expense' class */}
      <h3 className="total-value">Total Expenses: {new Intl.NumberFormat(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }).format(totalExpense)}</h3>
      <div className="pie-chart-container">
        <CustomPieChart data={data} labels={labels} />
      </div>
      <button className="details-button" onClick={handleButtonClick}>
        View Details
      </button>
      <PopupDisplay
        show={showPopup}
        handleClose={handleClosePopup}
        title="Expense Breakdown"
        breakdown={validBreakdown}
      />
    </div>
  );
};

export default ExpenseComponent;
