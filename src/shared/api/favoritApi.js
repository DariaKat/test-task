import axios from 'axios';

const API_BASE = 'http://api.favorit-parts.ru/hs/hsprice/';
const TEST_KEY = 'A1234567-ABCD-1234-ABCD-ABC123456789';

const apiClient = axios.create({
  baseURL: API_BASE,
  params: { key: TEST_KEY },
});

export const fetchManufacturers = async (article) => {
  const { data } = await apiClient.get('/', {
    params: { number: article },
  });
  return data.goods || [];
};

export const fetchAnalogues = async (article, brand) => {
  const { data } = await apiClient.get('/', {
    params: { number: article, brand, analogues: 'on' },
  });
  return data.goods || [];
};