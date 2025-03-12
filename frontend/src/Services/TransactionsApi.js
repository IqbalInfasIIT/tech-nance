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

export const getAllTransactionsWithNames = async (startDate, endDate) => {
  try {
    const response = await api.get('/transactions/get-transactions-with-names', { params: { startDate, endDate } });
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

export const getTransactionDateRange = async () => {
  try {
    const response = await api.get('/transactions/get-date-range');
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction date range:', error);
    throw error;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await api.delete(`/transactions/delete-id/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
