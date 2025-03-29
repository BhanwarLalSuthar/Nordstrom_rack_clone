import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const initialState = {
  products: [],
  productDetail: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    const response = await axiosInstance.get('/products');
    return response.data;
  }
);

// Async thunk for fetching a single product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, thunkAPI) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }
);

// Async thunk for searching/filtering products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchParams, thunkAPI) => {
    // searchParams should be an object containing query parameters:
    // e.g., { keyword: 'shirt', minPrice: 10, maxPrice: 100, sort: 'price-asc', page: 1, limit: 10 }
    const response = await axiosInstance.get('/products/search', {
      params: searchParams,
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // If needed, you can add reducers to clear productDetail or reset state here.
    clearProductDetail(state) {
      state.productDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearProductDetail } = productSlice.actions;
export default productSlice.reducer;
