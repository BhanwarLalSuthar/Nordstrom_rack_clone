import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get('/orders/my', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders; // assuming { orders: [...] }
  }
);

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId, thunkAPI) => {
      const token = thunkAPI.getState().auth.token;
      // Ensure the endpoint is correct. If your routes are mounted at '/api/orders', do:
      await axiosInstance.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return orderId;
    }
  );
  

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    myOrders: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.myOrders = action.payload;
        state.error = null;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.myOrders = state.myOrders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
