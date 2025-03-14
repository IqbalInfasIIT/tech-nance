import React, { useState, useEffect } from 'react';
import IncomeComponent from './Components/IncomeComponent';
import ExpenseComponent from './Components/ExpenseComponent';
import PeriodSelector from './Components/PeriodSelector';
import TransactionsList from './Components/TransactionsList';
import { getAllTransactionsWithNames, getTransactionDateRange, deleteTransaction} from '../Services/TransactionsApi';
import { getMonthlyTotals } from '../Services/MonthlyTotalsApi';
import { getAllCategoryTotals, getCategoryTotalsByPeriod  } from '../Services/MonthlyCategoryTotalsApi';

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
  const [monthlyTotalsFullRange, setmonthlyTotalsFullRange] = useState([]);
  const [monthlyCategoryTotals, setmonthlyCategoryTotals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [dateRange, setDateRange] = useState({ earliestDate: '', latestDate: '' });
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  useEffect(() => {
    const fetchDateRange = async () => {
      try {
        const range = await getTransactionDateRange();
        if (range.earliestDate && range.latestDate) {
          setDateRange(range);
          setStartDate(range.earliestDate);
          setEndDate(range.latestDate);
          await fetchData(range.earliestDate, range.latestDate, true);
          setInitialDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching date range:", error);
      }
    };
    fetchDateRange();
  }, []);
  
  const fetchData = async (start, end, isInitial = false) => {
    try {
      const totals = await getMonthlyTotals(start, end);
      if (isInitial) {
        setmonthlyTotalsFullRange(totals);
      } else {
        setMonthlyTotals(totals);
      }
      
      const transactionsData = await getAllTransactionsWithNames(start, end);
      setTransactions(transactionsData);

      const [startYear, startMonth] = start.split("-").slice(0, 2);
      const [endYear, endMonth] = end.split("-").slice(0, 2);

      let categoryTotals;

      if (startYear === endYear && startMonth === endMonth) {
        categoryTotals = await getCategoryTotalsByPeriod(startYear, startMonth);
      } else {
        categoryTotals = await getAllCategoryTotals();
      }

      setmonthlyCategoryTotals(categoryTotals);

      if (categoryTotals && categoryTotals.length > 0) {
        const incomeMap = new Map();
        const expenseMap = new Map();

        categoryTotals.forEach((item) => {
          const { category_type, total_amount, incomeCategory, expenseCategory } = item;
          const categoryName =
            category_type === 'income'
              ? incomeCategory?.category_name
              : expenseCategory?.category_name;

          if (!categoryName) return;

          const amount = parseFloat(total_amount);

          if (category_type === 'income') {
            incomeMap.set(categoryName, (incomeMap.get(categoryName) || 0) + amount);
          } else if (category_type === 'expense') {
            expenseMap.set(categoryName, (expenseMap.get(categoryName) || 0) + amount);
          }
        });

        const incomeBreakdownArray = Array.from(incomeMap, ([category_name, total]) => ({
          category_name,
          total,
        }));
        setIncomeBreakdown(incomeBreakdownArray);

        const expenseBreakdownArray = Array.from(expenseMap, ([category_name, total]) => ({
          category_name,
          total,
        }));
        setExpenseBreakdown(expenseBreakdownArray);
        console.log("income", incomeBreakdownArray)
        console.log("expense", expenseBreakdownArray)
      }

      if (totals && totals.length > 0) {
        let totalIncomeCalc = 0;
        let totalExpenseCalc = 0;
  
        totals.forEach(monthTotal => {
          totalIncomeCalc += parseFloat(monthTotal.total_income);
          totalExpenseCalc += parseFloat(monthTotal.total_expenses);
        });
  
        setTotalIncome(totalIncomeCalc);
        setTotalExpense(totalExpenseCalc);
      } else {
        setTotalIncome(0);
        setTotalExpense(0);
      }
      
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      console.log(transactionId);
      await deleteTransaction(transactionId);
      alert('Transaction deleted successfully!');
      setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.transaction_id !== transactionId)
      );
  } catch (error) {
      console.error('Error deleting transaction:', error);
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
            <IncomeComponent totalIncome={totalIncome} breakdown={incomeBreakdown}/>
            <ExpenseComponent totalExpense={totalExpense} breakdown={expenseBreakdown}/>
          </div>
          <div className='subTwo-left'>
            <CustomLineChart fullRange={monthlyTotalsFullRange} currentMonth={monthlyTotals} />
          </div>
        </div>
        <div className="panel-right">
          <TransactionsList transactions={transactions} handleDeleteTransaction={handleDeleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
