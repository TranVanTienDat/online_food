import { configureStore } from '@reduxjs/toolkit';
import productCartSlice from '~/slice/productCartSlice';
import productsSlice from '~/slice/productsSlice';
import userCommentSlice from '~/slice/userCommentSlice';
import infoDataUser from '~/slice/infoDataUser';
export const store = configureStore({
  reducer: {
    product: productCartSlice,
    products: productsSlice,
    comment: userCommentSlice,
    infoDataUser: infoDataUser,
  },
});
