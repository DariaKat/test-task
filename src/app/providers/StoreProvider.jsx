import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import partsSearchReducer from '@features/partsSearch/model/partsSearchSlice';

const store = configureStore({
  reducer: {
    partsSearch: partsSearchReducer,
  },
});

export const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);