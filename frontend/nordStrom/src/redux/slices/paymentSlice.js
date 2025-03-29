import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Thunk to create a Razorpay order on the backend
export const createRazorpayOrder = createAsyncThunk(
  'payment/createRazorpayOrder',
  async (orderData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post('/payment/order', orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // should return { success, orderId, amount, currency, order }
  }
);

// Thunk to verify the Razorpay payment signature on the backend
export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post('/payment/verify', paymentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // should return { success, order }
  }
);

const initialState = {
  order: null,         // To store Razorpay order details returned from backend
  status: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  verifyStatus: 'idle',
  verifyError: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentState(state) {
      state.order = null;
      state.status = 'idle';
      state.error = null;
      state.verifyStatus = 'idle';
      state.verifyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order Thunk
      .addCase(createRazorpayOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
        state.error = null;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Verify Payment Thunk
      .addCase(verifyPayment.pending, (state) => {
        state.verifyStatus = 'loading';
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyStatus = 'succeeded';
        // Update the order details with verified payment info if needed
        state.order = { ...state.order, ...action.payload.order };
        state.verifyError = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyStatus = 'failed';
        state.verifyError = action.error.message;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
