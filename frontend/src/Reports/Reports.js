import React, { useState, useEffect } from 'react';
import IncomeComponent from './Components/IncomeComponent';
import ExpenseComponent from './Components/ExpenseComponent';
import PeriodSelector from './Components/PeriodSelector';
import TransactionsList from './Components/TransactionsList';
import { getIncomeBreakdown, getExpenseBreakdown, getMonthlyTotals, getAllTransactionsWithNames } from '../Services/TransactionsApi';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const monthlyTotalsData = await getMonthlyTotals();
        setMonthlyTotals(monthlyTotalsData);
    
        let totalIncome = 0;
        let totalExpense = 0;
    
        monthlyTotalsData.forEach(item => {
          totalIncome += parseFloat(item.total_income);
          totalExpense += parseFloat(item.total_expenses);
        });
    
        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
    
        const incomeBreakdownData = await getIncomeBreakdown(startDate, endDate);
        setIncomeBreakdown(incomeBreakdownData);
        const expenseBreakdownData = await getExpenseBreakdown(startDate, endDate);
        setExpenseBreakdown(expenseBreakdownData);
        const transactionsData = await getAllTransactionsWithNames();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };    
    fetchData();
  }, [startDate, endDate]);


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
          monthlyTotals={monthlyTotals} 
          setStartDate={setStartDate} 
          setEndDate={setEndDate} 
        />
        <span className="balance-value">{balanceMessage} {formattedNetBalance}</span>
      </div>
      <div className="reports-grid">
        <div className="panel-left">
          <div className="subOne-left">
            <IncomeComponent totalIncome={totalIncome} breakdown={incomeBreakdown} />
            <ExpenseComponent totalExpense={totalExpense} breakdown={expenseBreakdown} />
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
