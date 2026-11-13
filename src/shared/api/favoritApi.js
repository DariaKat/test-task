import axios from 'axios';

const API_URL = 'https://api.favorit-parts.ru/hs/hsprice/';
const TEST_KEY = 'A1234567-ABCD-1234-ABCD-ABC123456789';

const buildUrl = (params) => `${API_URL}?${params.toString()}`;

const logDebug = (location, message, data, hypothesisId) => {
  // #region agent log
  fetch('http://127.0.0.1:7816/ingest/ec290c88-8831-4d66-9755-c23b1758fb47', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '23fdf9',
    },
    body: JSON.stringify({
      sessionId: '23fdf9',
      runId: 'post-fix',
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
};

export const fetchManufacturers = async (article) => {
  const params = new URLSearchParams({
    key: TEST_KEY,
    number: article,
  });
  const requestUrl = buildUrl(params);

  logDebug(
    'favoritApi.js:fetchManufacturers',
    'request manufacturers',
    { protocol: new URL(requestUrl).protocol, host: new URL(requestUrl).host, article },
    'H4'
  );

  const { data, status } = await axios.get(requestUrl);

  logDebug(
    'favoritApi.js:fetchManufacturers',
    'response manufacturers',
    {
      status,
      goodsCount: Array.isArray(data?.goods) ? data.goods.length : null,
      error: data?.error ?? null,
    },
    'H4'
  );

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

  logDebug(
    'favoritApi.js:fetchAnalogues',
    'request analogues',
    { protocol: new URL(requestUrl).protocol, host: new URL(requestUrl).host, article, brand },
    'H4'
  );

  const { data, status } = await axios.get(requestUrl);

  logDebug(
    'favoritApi.js:fetchAnalogues',
    'response analogues',
    {
      status,
      goodsCount: Array.isArray(data?.goods) ? data.goods.length : null,
      error: data?.error ?? null,
    },
    'H4'
  );

  if (data.error) throw new Error(data.error);
  if (!data.goods || data.goods.length === 0 || !data.goods[0].brand) return [];

  const mainItem = data.goods[0];
  const analoguesList = mainItem.analogues || [];

  return [mainItem, ...analoguesList];
};
