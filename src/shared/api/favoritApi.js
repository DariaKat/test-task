import axios from 'axios';

const API_URL = 'https://api.favorit-parts.ru/hs/hsprice/';
const TEST_KEY = 'A1234567-ABCD-1234-ABCD-ABC123456789';

const buildUrl = (params) => `${API_URL}?${params.toString()}`;

export const fetchManufacturers = async (article) => {
  const params = new URLSearchParams({
    key: TEST_KEY,
    number: article,
  });
  const requestUrl = buildUrl(params);

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
  const requestUrl = buildUrl(params);

  const { data } = await axios.get(requestUrl);

  if (data.error) throw new Error(data.error);
  if (!data.goods || data.goods.length === 0 || !data.goods[0].brand) return [];

  const mainItem = data.goods[0];
  const analoguesList = mainItem.analogues || [];

  return [mainItem, ...analoguesList];
};
