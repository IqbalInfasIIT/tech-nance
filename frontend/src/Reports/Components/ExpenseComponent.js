import React, { useState } from 'react';
import ReportsCustomPieChart from './ReportsCustomPieChart';
import PopupDisplay from './PopupDisplay';
import './IncExpComponent.css';

const ExpenseComponent = ({ totalExpense, breakdown = [] }) => {
  const [showPopup, setShowPopup] = useState(false);

  if ((!breakdown || breakdown.length === 0) && (!totalExpense || totalExpense === 0)) {
    return 
    <div className="IncExp-component">

    </div>;
  }

  const filteredBreakdown = breakdown.filter(item => item.total !== 0);

  const sortedBreakdown = [...filteredBreakdown].sort((a, b) => b.total - a.total);

  const top4Categories = sortedBreakdown.slice(0, 4);

  const otherCategoriesTotal = sortedBreakdown.slice(4).reduce((sum, item) => sum + item.total, 0);

  const data = [
    ...top4Categories.map(item => parseFloat(item.total || 0)),
    ...(otherCategoriesTotal > 0 ? [otherCategoriesTotal] : [])
  ];

  const labels = [
    ...top4Categories.map(item => item.category_name),
    ...(otherCategoriesTotal > 0 ? ['Other'] : [])
  ];

  const isRefund = totalExpense < 0;

  return (
    <div className="IncExp-component">
      {isRefund ? (
        <div className="ie-refund-value">
          Total Refunds: {new Intl.NumberFormat(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          }).format(Math.abs(totalExpense))}
        </div>
      ) : (
        <>
          <h3 className="ie-total-value">
            Total Expenses: {new Intl.NumberFormat(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(Math.abs(totalExpense))}
          </h3>
          <div className="ie-pie-chart-container">
            <ReportsCustomPieChart data={data} labels={labels} />
          </div>
          <button
            className="ie-details-button"
            onClick={() => setShowPopup(true)}
            disabled={isRefund || totalExpense === 0}
          >
            View Details
          </button>
          <PopupDisplay
            show={showPopup}
            handleClose={() => setShowPopup(false)}
            title="Expense Breakdown"
            breakdown={breakdown}
          />
        </>
      )}
    </div>
  );
};

export default ExpenseComponent;
