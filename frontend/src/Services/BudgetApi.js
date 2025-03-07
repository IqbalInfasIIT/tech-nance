import api from './api';

export const addBudget = async (newBudget) => {
  try {
    const response = await api.post('/budgets/add-budget', newBudget);
    return response.data;
  } catch (error) {
    console.error('Error adding budget:', error);
    throw error;
  }
};

export const getAllBudgets = async () => {
  try {
    const response = await api.get('/budgets/get-all-budgets');
    return response.data;
  } catch (error) {
    console.error('Error fetching all budgets:', error);
    throw error;
  }
};

export const getActiveBudgets = async () => {
  try {
    const response = await api.get('/budgets/get-active-budgets');
    return response.data;
  } catch (error) {
    console.error('Error fetching active budgets:', error);
    throw error;
  }
};

export const getBudgetByName = async (budgetName) => {
  try {
    const response = await api.get(`/budgets/get-budget-by-name/${budgetName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching budget with name ${budgetName}:`, error);
    throw error;
  }
};

export const deleteBudget = async (budgetName) => {
  try {
    const encodedBudgetName = encodeURIComponent(budgetName);
    const response = await api.delete(`/budgets/mark-inactive/${encodedBudgetName}`);
    return response.data;
  } catch (error) {
    console.error(`FRONTEND ERRORError marking budget inactive for Name ${budgetName}:`, error);
    throw error;
  }
};

