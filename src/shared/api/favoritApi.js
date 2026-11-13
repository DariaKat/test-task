import axios from 'axios';

const API_URL = 'http://api.favorit-parts.ru/hs/hsprice/';
const TEST_KEY = 'A1234567-ABCD-1234-ABCD-ABC123456789';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// На GitHub Pages используем прокси, чтобы обойти блокировку HTTPS -> HTTP
const BASE_URL = isLocal 
  ? API_URL 
  : 'https://api.allorigins.win/raw?url=' + encodeURIComponent(API_URL);

export const fetchManufacturers = async (article) => {
  const params = new URLSearchParams({
    key: TEST_KEY,
    number: article,
  });
  
  const requestUrl = isLocal 
    ? `${BASE_URL}?${params.toString()}`
    : `${BASE_URL}${encodeURIComponent('?' + params.toString())}`;

  const { data } = await axios.get(requestUrl);
  
  if (data.error) throw new Error(data.error);
  if (!data.goods || data.goods.length === 0 || !data.goods[0].brand) return [];
  
  return [...new Set(data.goods.map((item) => item.brand))];
};

export const fetchAnalogues = async (article, brand) => {
  const params = new URLSearchParams({
    key: TEST_KEY,
    number: article,
    brand: brand,
    analogues: 'on',
    info: 'on',
  });

  const requestUrl = isLocal 
    ? `${BASE_URL}?${params.toString()}`
    : `${BASE_URL}${encodeURIComponent('?' + params.toString())}`;

  const { data } = await axios.get(requestUrl);
  
  if (data.error) throw new Error(data.error);
  if (!data.goods || data.goods.length === 0 || !data.goods[0].brand) return [];

  const mainItem = data.goods[0];
  const analoguesList = mainItem.analogues || [];

  return [mainItem, ...analoguesList];
};