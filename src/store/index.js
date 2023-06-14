import { configureStore } from '@reduxjs/toolkit';
import sliceAddress from '~/slice/addressSlice';
import productCartSlice from '~/slice/productCartSlice';
import productsSlice from '~/slice/productsSlice';
import userCommentSlice from '~/slice/userCommentSlice';

export const store = configureStore({
  reducer: {
    product: productCartSlice,
    address: sliceAddress,
    products: productsSlice,
    comment: userCommentSlice,
  },
});
