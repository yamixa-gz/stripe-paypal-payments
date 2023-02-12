import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from 'react-dotenv';

export const initialState = {
  data: undefined,
  error: undefined,
  isLoading: false,
  isLoaded: false,
};

export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const productsResponse = await fetch(`${env.SERVER_URL}/products`);
      const { data, error } = await productsResponse.json();
      return productsResponse.ok
        ? data
        : rejectWithValue(error || 'Something went wrong');
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsAsync.pending, state => {
        state.isLoading = true;
        state.data = undefined;
        state.error = undefined;
        state.isLoaded = false;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoaded = false;
      });
  },
});

export default productsSlice.reducer;
