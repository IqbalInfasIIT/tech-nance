import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getIncomeCategories = async () => {
  try {
    const response = await api.get('/categories/get-income-categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching income categories:', error);
    throw error;
  }
};

export const getExpenseCategories = async () => {
  try {
    const response = await api.get('/categories/get-expense-categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    throw error;
  }
};
