import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions/get-transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const getAllTransactionsWithNames = async () => {
  try {
    const response = await api.get('/transactions/get-transactions-with-names');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions with names:', error);
    throw error;
  }
};

export const getTransactionById = async (transactionId) => {
  try {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
};

export const addTransaction = async (transaction) => {
  try {
    const response = await api.post('/transactions/add-transaction', transaction);
    return response;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getTotalIncome = async (period) => {
  try {
    const response = await api.get('/transactions/total-income', { params: { period } });
    return response.data;
  } catch (error) {
    console.error('Error fetching total income:', error);
    throw error;
  }
};

export const getIncomeBreakdown = async (period) => {
  try {
    const response = await api.get('/transactions/income-breakdown', { params: { period } });
    return response.data;
  } catch (error) {
    console.error('Error fetching income breakdown:', error);
    throw error;
  }
};

export const getTotalExpense = async (period) => {
  try {
    const response = await api.get('/transactions/total-expense', { params: { period } });
    return response.data;
  } catch (error) {
    console.error('Error fetching total expense:', error);
    throw error;
  }
};

export const getExpenseBreakdown = async (period) => {
  try {
    const response = await api.get('/transactions/expense-breakdown', { params: { period } });
    return response.data;
  } catch (error) {
    console.error('Error fetching expense breakdown:', error);
    throw error;
  }
};

export const getMonthlyTotals = async () => {
  try {
    const response = await api.get('/transactions/monthly-totals');
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly totals:', error);
    throw error;
  }
};
