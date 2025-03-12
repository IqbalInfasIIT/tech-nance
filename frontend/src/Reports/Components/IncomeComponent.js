import React, { useState } from 'react';
import CustomPieChart from './CustomPieChart';
import PopupDisplay from './PopupDisplay';
import './IncExpComponent.css';

const IncomeComponent = ({ totalIncome, breakdown = [] }) => {
  const [showPopup, setShowPopup] = useState(false);

  const sortedBreakdown = [...breakdown].sort((a, b) => b.total - a.total);

  const top4Categories = sortedBreakdown.slice(0, 4);

  const otherCategoriesTotal = sortedBreakdown.slice(4).reduce((acc, item) => acc + parseFloat(item.total || 0), 0);

  const data = [
    ...top4Categories.map(item => parseFloat(item.total || 0)),
    ...(otherCategoriesTotal > 0 ? [otherCategoriesTotal] : [])
  ];

  const labels = [
    ...top4Categories.map(item => item.category_name),
    ...(otherCategoriesTotal > 0 ? ['Other'] : [])
  ];

  return (
    <div className="IncExp-component">
      <h3 className="ie-total-value">
        Total Income: {new Intl.NumberFormat(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        }).format(totalIncome)}
      </h3>

      <div className="ie-pie-chart-container">
        <CustomPieChart data={data} labels={labels} />
      </div>

      <button className="ie-details-button" onClick={() => setShowPopup(true)}>
        View Details
      </button>

      <PopupDisplay
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        title="Income Breakdown"
        breakdown={breakdown}
      />
    </div>
  );
};

export default IncomeComponent;
