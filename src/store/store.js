import { configureStore } from '@reduxjs/toolkit';
import productsGetSlice from './productsGetSlice/slice';
import buyProductsWithStripe from './productsStripePostSlice/slice';

const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      products: productsGetSlice,
      buyProductsWithStripe: buyProductsWithStripe,
    },
    preloadedState,
  });
};

export default setupStore;
