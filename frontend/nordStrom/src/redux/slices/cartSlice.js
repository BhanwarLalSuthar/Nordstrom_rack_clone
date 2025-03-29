import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (cartData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post('/cart', cartData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, quantity }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.put(
      `/cart/${id}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await axiosInstance.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
