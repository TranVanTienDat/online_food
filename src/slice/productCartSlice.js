import { createSlice } from '@reduxjs/toolkit';

const productCartSlice = createSlice({
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
export const { addCart, removeCart } = productCartSlice.actions;
export default productCartSlice.reducer;
