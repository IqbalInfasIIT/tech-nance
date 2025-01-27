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
