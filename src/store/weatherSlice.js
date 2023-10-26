// src/redux/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (zipcode, { rejectWithValue }) => {
  try {
    console.log('Pass param ==> ', zipcode);
    const response = await axios.get(`http://localhost:3100/weather?zipcode=${zipcode}`);
    console.log('Response ==> ', JSON.stringify(response, null, 2));
    return response.data;
  } catch (error) {
    alert(error?.message);
    return rejectWithValue('An error occurred while fetching weather data');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Paylaod ==> ', JSON.stringify(action.payload, null, 2));
        if (action.payload?.success === false) {
          state.error = action.payload?.error?.info;
        } else {
          state.data = action.payload;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer;
