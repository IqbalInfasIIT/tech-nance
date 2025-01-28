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
        {/* Example options - you can populate this dynamically based on your needs */}
        <option value="2025-01">Jan 2025</option>
        <option value="2024">Year 2024</option>
        <option value="2023-01">January 2023</option>
        <option value="2023-02">February 2023</option>
        <option value="2023-03">March 2023</option>
        <option value="2023-04">April 2023</option>
        <option value="2023-05">May 2023</option>
        <option value="2023-06">June 2023</option>
        <option value="2023-07">July 2023</option>
        <option value="2023-08">August 2023</option>
        <option value="2023-09">September 2023</option>
        <option value="2023-10">October 2023</option>
        <option value="2023-11">November 2023</option>
        <option value="2023-12">December 2023</option>
        <option value="2023">Year 2023</option>

      </select>
    </div>
  );
};

export default PeriodSelector;
