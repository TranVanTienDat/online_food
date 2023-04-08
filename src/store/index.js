import { configureStore } from '@reduxjs/toolkit';
import productSlice from '~/slice/productSlice';
import sliceAddress from '~/slice/addressSlice';
import productsSlice from '~/slice/productsSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    address: sliceAddress,
    products: productsSlice,
  },
});
