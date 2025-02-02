import React, { useState, useEffect } from 'react';
import IncomeComponent from './Components/IncomeComponent';
import ExpenseComponent from './Components/ExpenseComponent';
import PeriodSelector from './Components/PeriodSelector';
import TransactionsList from './Components/TransactionsList';
import { getIncomeBreakdown, getExpenseBreakdown, getMonthlyTotals, getAllTransactionsWithNames } from '../Services/TransactionsApi';
import CustomLineChart from './Components/CustomLineChart';
import './Reports.css';

const Reports = () => {
  const [period, setPeriod] = useState('2025-02');
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
        
        const currentMonthTotals = monthlyTotalsData.find(item => {
          const formattedPeriod = `${item.year}-${String(item.month).padStart(2, '0')}`;
          return formattedPeriod === period;
        });

        if (currentMonthTotals) {
          setTotalIncome(currentMonthTotals.total_income);
          setTotalExpense(currentMonthTotals.total_expenses);
        } else {
          setTotalIncome(0);
          setTotalExpense(0);
        }

        const incomeBreakdownData = await getIncomeBreakdown(period);
        setIncomeBreakdown(incomeBreakdownData);

        const expenseBreakdownData = await getExpenseBreakdown(period);
        setExpenseBreakdown(expenseBreakdownData);

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
