import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchManufacturers, fetchAnalogues } from '@shared/api';

export const searchManufacturers = createAsyncThunk(
  'partsSearch/searchManufacturers',
  async (article) => {
    const goods = await fetchManufacturers(article);
    return [...new Set(goods.map((item) => item.brand))];
  }
);

export const searchAnalogues = createAsyncThunk(
  'partsSearch/searchAnalogues',
  async ({ article, brand }) => {
    return await fetchAnalogues(article, brand);
  }
);

const initialState = {
  article: '',
  manufacturers: [],
  selectedBrand: null,
  analogues: [],
  loadingManufacturers: false,
  loadingAnalogues: false,
  errorManufacturers: null,
  errorAnalogues: null,
};

const partsSearchSlice = createSlice({
  name: 'partsSearch',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
      state.manufacturers = [];
      state.selectedBrand = null;
      state.analogues = [];
      state.errorManufacturers = null;
      state.errorAnalogues = null;
    },
    selectBrand: (state, action) => {
      state.selectedBrand = action.payload;
      state.analogues = [];
      state.errorAnalogues = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchManufacturers.pending, (state) => {
        state.loadingManufacturers = true;
        state.errorManufacturers = null;
      })
      .addCase(searchManufacturers.fulfilled, (state, action) => {
        state.loadingManufacturers = false;
        state.manufacturers = action.payload;
      })
      .addCase(searchManufacturers.rejected, (state, action) => {
        state.loadingManufacturers = false;
        state.errorManufacturers =
          action.error.message || 'Ошибка загрузки производителей';
      })
      .addCase(searchAnalogues.pending, (state) => {
        state.loadingAnalogues = true;
        state.errorAnalogues = null;
      })
      .addCase(searchAnalogues.fulfilled, (state, action) => {
        state.loadingAnalogues = false;
        state.analogues = action.payload;
      })
      .addCase(searchAnalogues.rejected, (state, action) => {
        state.loadingAnalogues = false;
        state.errorAnalogues =
          action.error.message || 'Ошибка загрузки аналогов';
      });
  },
});

export const { setArticle, selectBrand } = partsSearchSlice.actions;

export const selectArticle = (state) => state.partsSearch.article;
export const selectManufacturers = (state) => state.partsSearch.manufacturers;
export const selectSelectedBrand = (state) => state.partsSearch.selectedBrand;
export const selectAnalogues = (state) => state.partsSearch.analogues;
export const selectLoadingManufacturers = (state) =>
  state.partsSearch.loadingManufacturers;
export const selectLoadingAnalogues = (state) =>
  state.partsSearch.loadingAnalogues;
export const selectErrorManufacturers = (state) =>
  state.partsSearch.errorManufacturers;
export const selectErrorAnalogues = (state) => state.partsSearch.errorAnalogues;

export default partsSearchSlice.reducer;