import api from './api';

export const getMonthlyTotals = async (startDate, endDate) => {
  try {
    const response = await api.get('/monthly-totals/get-monthly-totals', {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly totals:', error);
    throw error;
  }
};
