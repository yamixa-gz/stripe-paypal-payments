import { configureStore } from '@reduxjs/toolkit';
import productsGetSlice from './productsGetSlice/slice';

const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      products: productsGetSlice,
    },
    preloadedState,
  });
};

export default setupStore;
