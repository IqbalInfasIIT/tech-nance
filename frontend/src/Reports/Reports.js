import React, { useState, useEffect } from 'react';
import IncomeComponent from './Components/IncomeComponent';
import ExpenseComponent from './Components/ExpenseComponent';
import PeriodSelector from './Components/PeriodSelector';
import TransactionsList from './Components/TransactionsList';
import { getTotalIncome, getIncomeBreakdown, getTotalExpense, getExpenseBreakdown, getMonthlyTotals, getAllTransactionsWithNames } from '../Services/TransactionsApi';
import CustomLineChart from './Components/CustomLineChart';
import './Reports.css';

const Reports = () => {
  const [period, setPeriod] = useState('2025-01'); // Default period (YYYY-MM)
  const [totalIncome, setTotalIncome] = useState(0);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [transactions, setTransactions] = useState([]); // New state for transactions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const income = await getTotalIncome(period);
        setTotalIncome(income.total_income);

        const incomeBreakdownData = await getIncomeBreakdown(period);
        setIncomeBreakdown(incomeBreakdownData);

        const expense = await getTotalExpense(period);
        setTotalExpense(expense.total_expense);

        const expenseBreakdownData = await getExpenseBreakdown(period);
        setExpenseBreakdown(expenseBreakdownData);

        const monthlyTotalsData = await getMonthlyTotals();
        setMonthlyTotals(monthlyTotalsData);

        const transactionsData = await getAllTransactionsWithNames();
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [period]);

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
        <PeriodSelector period={period} setPeriod={setPeriod} />
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
