import { configureStore } from '@reduxjs/toolkit';
import productSlice from '~/slice/productSlice';
import sliceAddress from '~/slice/sliceAddress';

export const store = configureStore({
  reducer: {
    product: productSlice,
    address: sliceAddress,
  },
});
