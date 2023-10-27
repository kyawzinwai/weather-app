import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (zipcode, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:3100/weather?zipcode=${zipcode}`);
    return response.data;
  } catch (error) {
    // alert(error?.response?.data?.message);
    return rejectWithValue(error?.response?.data?.message || 'An error occurred while fetching weather data');
  }
});