import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { weatherApi } from '../api/weatherApi';
import { WeatherData } from '../types/weather';

// Define the state type
interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Define the initial state
const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

// Define the async thunk for fetching weather
interface FetchWeatherParams {
  city: string;
  days: number;
}

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async ({ city, days }: FetchWeatherParams) => {
    return await weatherApi.getWeatherByCity(city, days);
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch weather data';
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;