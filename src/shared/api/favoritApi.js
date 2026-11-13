import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Выбираем базовый URL
const API_BASE = isLocal
  ? 'http://api.favorit-parts.ru/hs/hsprice/'
  : 'https://corsproxy.io/?http://api.favorit-parts.ru/hs/hsprice/'; // Используем прокси для продакшена

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