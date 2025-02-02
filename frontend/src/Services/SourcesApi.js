import api from './api';

export const getSources = async () => {
  try {
    const response = await api.get('/sources/get-capital-sources');
    return response.data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};

export const addSource = async (newSource) => {
  try {
    const response = await api.post('/sources/add-capital-source', newSource);
    return response.data;
  } catch (error) {
    console.error('Error adding source:', error);
    throw error;
  }
};

export const deleteSource = async (sourceId) => {
  try {
    const response = await api.patch(`/sources/delete-capital-source/${sourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting source:', error);
    throw error;
  }
};

export const getSourceById = async (sourceId) => {
  try {
    const response = await api.get(`/sources/${sourceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching source details:', error);
    throw error;
  }
};
