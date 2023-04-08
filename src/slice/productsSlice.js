import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsApi from '~/api/productsApi';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await productsApi.getAll();
      return response;
    } catch (err) {
      const message = (err.response && err.response.data) || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    status: false,
    products: [],
    searchText: '',
    rate: '',
    masse: '',
  },
  reducers: {
    resetProducts: (state) => {
      state.loading = false;
      state.status = false;
      state.products = [];
    },
    setProductSearch: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.status = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products = [];
        state.masse = action.payload;
      });
  },
});
export const { resetProducts, setProductSearch } = productsSlice.actions;
export default productsSlice.reducer;
