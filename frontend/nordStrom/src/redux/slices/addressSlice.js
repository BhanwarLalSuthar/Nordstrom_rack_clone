import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  addresses: [],
  status: 'idle',
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get('/addresses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (addressData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post('/addresses', addressData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, data }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.put(`/addresses/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await axiosInstance.delete(`/addresses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create Address
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (addr) => addr._id !== action.payload
        );
      });
  },
});

export default addressSlice.reducer;
