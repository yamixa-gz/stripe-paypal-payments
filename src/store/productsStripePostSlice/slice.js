import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import env from 'react-dotenv';

export const initialState = {
  data: undefined,
  error: undefined,
  isLoading: false,
  isLoaded: false,
};

export const buyProductsWithStripeAsync = createAsyncThunk(
  'products/fetchStripePostSlice',
  async (payload = {}, { rejectWithValue }) => {
    const boughtProducts = Object.entries(payload).map(
      ([id, { quantity }]) => ({
        id,
        quantity,
      }),
    );

    try {
      const boughtProductsResponse = await fetch(
        `${env.SERVER_URL}/create-stripe-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(boughtProducts),
        },
      );
      const { url } = await boughtProductsResponse.json();
      return boughtProductsResponse.ok
        ? (window.location = url)
        : rejectWithValue('Something went wrong');
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const buyProductsWithStripeSlice = createSlice({
  name: 'buyProductsWithStripe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(buyProductsWithStripeAsync.pending, state => {
        state.isLoading = true;
        state.data = undefined;
        state.error = undefined;
        state.isLoaded = false;
      })
      .addCase(buyProductsWithStripeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isLoaded = true;
      })
      .addCase(buyProductsWithStripeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoaded = false;
      });
  },
});

export default buyProductsWithStripeSlice.reducer;
