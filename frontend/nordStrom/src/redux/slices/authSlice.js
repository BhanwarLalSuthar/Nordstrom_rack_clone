import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const token = localStorage.getItem('token') || null;

const initialState = {
  user: null,
  token,
  status: 'idle',
  error: null,
};

export const loadUserProfile = createAsyncThunk(
    'auth/loadUserProfile',
    async (_, thunkAPI) => {
      // Use the token from state (or localStorage) to get the user profile
      try {
        const response = await axiosInstance.get('/users/profile', {
          headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message || 'Failed to load user');
      }
    }
  );
  

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    const response = await axiosInstance.post('/users/register', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    const response = await axiosInstance.post('/users/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await axiosInstance.put('/users/profile', userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
      // Remove token from localStorage; backend logout can be adjusted as needed.
      await axiosInstance.post('/users/logout');
      localStorage.removeItem('token');
      return null;
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // Load user profile
      .addCase(loadUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.user = null;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
