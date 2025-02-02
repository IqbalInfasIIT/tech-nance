import React from 'react';
import '../Reports.css';

const PeriodSelector = ({ period, setPeriod }) => {
  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <div className="period-selector">
      <label htmlFor="period">Select Period: </label>
      <select id="period" value={period} onChange={handlePeriodChange}>
        <option value="2025-02">Feb 2025</option>
        <option value="2025-01">Jan 2025</option>
        <option value="2024-12">Dec 2024</option>
        <option value="2024-11">Nov 2024</option>
        <option value="2024-10">Oct 2024</option>
        <option value="2024-09">Sep 2024</option>
        <option value="2024-08">Aug 2024</option>
        <option value="2024-07">Jul 2024</option>
        <option value="2024-06">Jun 2024</option>
      </select>
    </div>
  );
};

export default PeriodSelector;
