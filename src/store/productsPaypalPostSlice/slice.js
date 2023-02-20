import { createAsyncThunk } from '@reduxjs/toolkit';
import env from 'react-dotenv';

export const buyProductsWithPaypalAsync = createAsyncThunk(
  'products/fetchPaypalPostSlice',
  async (payload = {}, { rejectWithValue }) => {
    const boughtProducts = Object.entries(payload).map(
      ([id, { quantity }]) => ({
        id,
        quantity,
      }),
    );

    try {
      const boughtProductsResponse = await fetch(
        `${env.SERVER_URL}/create-paypal-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(boughtProducts),
        },
      );
      const response = await boughtProductsResponse.json();
      const { id } = response || {};

      return boughtProductsResponse.ok
        ? id
        : rejectWithValue('Something went wrong');
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
