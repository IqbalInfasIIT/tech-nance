import React, { useState } from 'react';

const PeriodSelector = ({ dateRange, startDate, endDate, onPeriodChange }) => {
  const [selectedValue, setSelectedValue] = useState("all-time");

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDateRange = (earliestDate, latestDate) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startDate = new Date(earliestDate);
    const endDate = new Date(latestDate);
    const allTimeValue = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}_to_${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}`;
    const dateRange = [{ name: "All Time", value: allTimeValue }];

    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}`;
      dateRange.push({ name: `${monthNames[month]} ${year}`, value: dateString });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return dateRange;
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value.includes('_to_')) {
      const [start, end] = value.split('_to_');
      const startDate = `${start}-01`;
      const [endYear, endMonth] = end.split("-");
      const lastDay = getLastDayOfMonth(parseInt(endYear), parseInt(endMonth) - 1);
      const endDate = `${end}-${lastDay}`;
      onPeriodChange(startDate, endDate);
    } else {
      const [year, month] = value.split("-");
      const newStartDate = `${year}-${month}-01`;
      const lastDay = getLastDayOfMonth(parseInt(year), parseInt(month) - 1);
      const newEndDate = `${year}-${month}-${lastDay}`;
      onPeriodChange(newStartDate, newEndDate);
    }
  };
  

  const { earliestDate, latestDate } = dateRange;
  const generatedDateRange = generateDateRange(earliestDate, latestDate);

  return (
    <div className="period-selector">
      <label>Month:</label>
      <select value={selectedValue} onChange={handleDateChange}>
        {generatedDateRange.map(({ name, value }) => (
          <option key={value} value={value}>{name}</option>
        ))}
      </select>
    </div>
  );
};

export default PeriodSelector;
