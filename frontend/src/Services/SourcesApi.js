import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getSources = async () => {
  try {
    const response = await api.get('/sources/get-capital-sources');
    return response.data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};

export const getBankAccounts = async () => {
  try {
    const response = await api.get('/sources/get-bank-accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
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

export const getDigitalWallets = async () => {
  try {
    const response = await api.get('/sources/get-digital-wallets');
    return response.data;
  } catch (error) {
    console.error('Error fetching digital wallets:', error);
    throw error;
  }
};

export const getCards = async () => {
  try {
    const response = await api.get('/sources/get-cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

export const getCreditCards = async () => {
  try {
    const response = await api.get('/sources/get-credit-cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
};

export const getGifts = async () => {
  try {
    const response = await api.get('/sources/get-gifts');
    return response.data;
  } catch (error) {
    console.error('Error fetching gifts:', error);
    throw error;
  }
};