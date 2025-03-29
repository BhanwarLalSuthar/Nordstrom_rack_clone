import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  wishlistItems: [],
  status: 'idle',
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get('/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addWishlistItem = createAsyncThunk(
  'wishlist/addWishlistItem',
  async (productId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      '/wishlist',
      { product: productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
);



export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeWishlistItem',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await axiosInstance.delete(`/wishlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist(state) {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistItems = action.payload;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.wishlistItems.push(action.payload);
      })
  
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
