import api from './api';

export const getCategoryTotalsExpenseByCategoryId = async (categoryId) => {
  try {
    const response = await api.get(`/monthly-category-totals/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category totals for category ID ${categoryId}:`, error);
    throw error;
  }
};

export const getAllCategoryTotals = async () => {
  try {
    const response = await api.get(`/monthly-category-totals/get-all-category-totals`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category totals for :`, error);
    throw error;
  }
};

export const getCategoryTotalsByPeriod = async (year, month) => {
  try {
    const response = await api.get(`/monthly-category-totals/period/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category totals for ${year}-${month}:`, error);
    throw error;
  }
};
