import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'productCart',
  initialState: [],
  reducers: {
    addCart(state, action) {
      state.push(action.payload);
    },
    removeCart(state, action) {
      state.splice(action.payload, 1);
    },
  },
});
export const { addCart, removeCart } = productSlice.actions;
export default productSlice.reducer;
