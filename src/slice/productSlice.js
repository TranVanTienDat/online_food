import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productCart',
  initialState: [],
  reducers: {
    addCart(state, action) {
      return [...state, action.payload];
    },
    removeCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addCart, removeCart } = productSlice.actions;
export default productSlice.reducer;
