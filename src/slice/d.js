import { createSlice } from '@reduxjs/toolkit';

const filterProductSlice = createSlice({
  name: 'filterProductSlice',
  initialState: {
    search: '',
    category: 'All',
    rate: '',
    price: '',
  },
  reducers: {
    addCart(state, action) {
      return [...state, action.payload];
    },
    removeCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addCart, removeCart } = filterProductSlice.actions;
export default filterProductSlice.reducer;
