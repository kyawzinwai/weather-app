import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (zipcode, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3100/weather?zipcode=${zipcode}`);
    return response.data;
  } catch (error) {
    // alert(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data?.message || 'An error occurred while fetching weather data');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    resetData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success === false) {
          state.error = action.payload?.error?.info;
        } else {
          state.data = action.payload;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch weather data';
      });
  },
});

export const { resetData } = weatherSlice.actions;

export default weatherSlice.reducer;
