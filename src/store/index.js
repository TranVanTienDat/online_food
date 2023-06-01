import { configureStore } from '@reduxjs/toolkit';
import productCartSlice from '~/slice/productCartSlice';
import sliceAddress from '~/slice/addressSlice';
import productsSlice from '~/slice/productsSlice';

export const store = configureStore({
  reducer: {
    product: productCartSlice,
    address: sliceAddress,
    products: productsSlice,
  },
});
