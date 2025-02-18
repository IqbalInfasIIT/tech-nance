import React, { useState, useEffect } from 'react';
import '../Reports.css';

const PeriodSelector = ({ monthlyTotals, setStartDate, setEndDate }) => {
  const [useDatePicker, setUseDatePicker] = useState(false);

  const sortedMonthlyTotals = monthlyTotals.sort((a, b) => {
    const dateA = new Date(a.year, a.month - 1);
    const dateB = new Date(b.year, b.month - 1);
    return dateB - dateA;
  });

  const handlePeriodChange = (event) => {
    const [year, month] = event.target.value.split('-');
    const start = `${year}-${month}-01`;
    const end = `${year}-${month}-${new Date(year, month, 0).getDate()}`;
    setStartDate(start);
    setEndDate(end);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="period-selector">
      <label>
        <input 
          type="radio" 
          name="dateOption" 
          value="dropdown" 
          checked={!useDatePicker} 
          onChange={() => setUseDatePicker(false)} 
        />
        Select Month
      </label>
      <label>
        <input 
          type="radio" 
          name="dateOption" 
          value="datepicker" 
          checked={useDatePicker} 
          onChange={() => setUseDatePicker(true)} 
        />
        Select Date Range
      </label>
      
      {useDatePicker ? (
        <div className="date-picker">
          <input 
            type="date" 
            onChange={handleStartDateChange} 
            placeholder="Start Date" 
          />
          <input 
            type="date" 
            onChange={handleEndDateChange} 
            placeholder="End Date" 
          />
        </div>
      ) : (
        <div className="dropdown">
          <label htmlFor="period">Select Period: </label>
          <select id="period" onChange={handlePeriodChange}>
            {sortedMonthlyTotals.map(item => (
              <option key={`${item.year}-${item.month}`} value={`${item.year}-${String(item.month).padStart(2, '0')}`}>
                {`${item.year}-${String(item.month).padStart(2, '0')}`}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default PeriodSelector;
