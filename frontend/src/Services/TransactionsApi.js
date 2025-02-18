import api from './api';

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

export const getIncomeBreakdown = async (startDate, endDate) => {
  try {
    const response = await api.get('/transactions/income-breakdown', { params: { startDate, endDate } });
    return response.data;
  } catch (error) {
    console.error('Error fetching income breakdown:', error);
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
