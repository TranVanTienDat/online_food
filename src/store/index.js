import { configureStore } from '@reduxjs/toolkit';
import info from '~/slice/info';
import productCartSlice from '~/slice/productCartSlice';
import productsSlice from '~/slice/productsSlice';
import userCommentSlice from '~/slice/userCommentSlice';

export const store = configureStore({
  reducer: {
    product: productCartSlice,
    products: productsSlice,
    comment: userCommentSlice,
    infoUser: info,
  },
});
