import { createAsyncThunk } from '@reduxjs/toolkit';
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
        ? url
        : rejectWithValue('Something went wrong');
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
