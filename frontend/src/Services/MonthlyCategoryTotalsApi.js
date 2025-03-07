import api from './api';

export const getTotalsByCategoryId = async (categoryId) => {
  try {
    const response = await api.get(`/monthly-category-totals/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching totals for category ID ${categoryId}:`, error);
    throw error;
  }
};

export const getTotalsByPeriod = async (year, month) => {
  try {
    const response = await api.get(`/monthly-category-totals/period/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching totals for ${year}-${month}:`, error);
    throw error;
  }
};
