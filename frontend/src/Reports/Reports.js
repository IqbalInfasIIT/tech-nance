import React, { useState, useEffect } from 'react';
import IncomeComponent from './Components/IncomeComponent';
import ExpenseComponent from './Components/ExpenseComponent';
import PeriodSelector from './Components/PeriodSelector';
import TransactionsList from './Components/TransactionsList';
import { getAllTransactionsWithNames, getTransactionDateRange } from '../Services/TransactionsApi';
import { getMonthlyTotals } from '../Services/MonthlyTotalsApi';
import CustomLineChart from './Components/CustomLineChart';
import './Reports.css';

const Reports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ earliestDate: '', latestDate: '' });

  useEffect(() => {
    const fetchDateRange = async () => {
      try {
        const range = await getTransactionDateRange();
        if (range.earliestDate && range.latestDate) {
          setDateRange(range);
          setStartDate(range.earliestDate);
          setEndDate(range.latestDate);
          fetchData(range.earliestDate, range.latestDate);
        }
      } catch (error) {
        console.error("Error fetching date range:", error);
      }
    };
  
    fetchDateRange();
  }, []);
  
  const fetchData = async (start, end) => {
    try {
      const totals = await getMonthlyTotals(start, end);
      setMonthlyTotals(totals);
      const transactionsData = await getAllTransactionsWithNames(start, end);
      setTransactions(transactionsData);

      const totalIncomeCalc = transactionsData
        .filter(txn => txn.type === "income")
        .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
  
      const totalExpenseCalc = transactionsData
        .filter(txn => txn.type === "expense")
        .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
  
      setTotalIncome(totalIncomeCalc);
      setTotalExpense(totalExpenseCalc);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const netBalance = totalIncome - totalExpense;
  const balanceMessage = netBalance > 0 ? 'Saved:' : netBalance < 0 ? 'Overspent by:' : 'Balanced';
  const formattedNetBalance = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(netBalance));
  const balanceClass = netBalance > 0 ? 'saved' : netBalance < 0 ? 'overspent' : 'balanced';

  return (
    <div className="reports-container">
      <div className={`net-balance-container ${balanceClass}`}>
      <PeriodSelector 
          startDate={startDate}
          endDate={endDate}
          dateRange={dateRange}
          onPeriodChange={(newStart, newEnd) => {
          setStartDate(newStart);
          setEndDate(newEnd);
          fetchData(newStart, newEnd);
        }} 
        />

        <span className="balance-value">{balanceMessage} {formattedNetBalance}</span>
      </div>
      <div className="reports-grid">
        <div className="panel-left">
          <div className="subOne-left">
            <IncomeComponent totalIncome={totalIncome}/>
            <ExpenseComponent totalExpense={totalExpense}/>
          </div>
          <div className='subTwo-left'>
            <CustomLineChart data={monthlyTotals} />
          </div>
        </div>
        <div className="panel-right">
          <TransactionsList transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
