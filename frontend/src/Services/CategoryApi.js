import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getMainCategories = async (type) => {
  try {
    const response = await api.get(`/categories/get-main-categories/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

export const addCategory = async (category, type) => {
  try {
    const response = await api.post('/categories/add-category', { ...category, type });
    return response.data;
  } catch (error) {
    console.error(`Error adding ${type} category:`, error);
    throw error;
  }
};

export const deleteCategory = async (categoryId, categoryType) => {
  try {
    const response = await api.delete('/categories/delete-category', {
      data: { categoryId, categoryType }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getMainCategoryCount = async (type) => {
  try {
    const response = await api.get(`/categories/main-category-count/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching main ${type} category count:`, error);
    throw error;
  }
};

export const getLinkedCategories = async (type, parentId) => {
  try {
    const response = await api.get(`/categories/linked-categories/${type}/${parentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching linked ${type} categories:`, error);
    throw error;
  }
};
