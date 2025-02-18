import React from 'react';

const PeriodSelector = ({ startDate, endDate, onPeriodChange }) => {
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    if (new Date(newStartDate) > new Date(endDate)) {
      onPeriodChange(newStartDate, newStartDate);
    } else {
      onPeriodChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    if (new Date(newEndDate) < new Date(startDate)) {
      onPeriodChange(startDate, startDate);
    } else {
      onPeriodChange(startDate, newEndDate);
    }
  };

  return (
    <div className="period-selector">
      <label>Start Date:</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={handleStartDateChange} 
      />
      
      <label>End Date:</label>
      <input 
        type="date" 
        value={endDate} 
        min={startDate}
        onChange={handleEndDateChange} 
      />
    </div>
  );
};

export default PeriodSelector;
