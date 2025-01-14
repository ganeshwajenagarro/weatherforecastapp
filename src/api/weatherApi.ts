import axios, { AxiosError } from 'axios';
import { WeatherData, WeatherApiResponse } from '../types/weather';

const API_KEY = 'e52a6372783e4a689df63118251401';
const BASE_URL = 'https://api.weatherapi.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    days: 5,
    aqi: 'no',
    alerts: 'no'
  },
});

// https://api.weatherapi.com/v1/forecast.json?key=e52a6372783e4a689df63118251401&q=London&days=2&aqi=no&alerts=no

export const weatherApi = {
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await api.get<WeatherApiResponse>('/forecast.json', {
        params: { q: city }
      });
      return transformWeatherData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error(`City "${city}" not found`);
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        }
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch weather data');
      }
      throw new Error('An unexpected error occurred');
    }
  },
};

function transformWeatherData(data: WeatherApiResponse): WeatherData {
  const current = {
    temp: Math.round(data.current.temp_c),
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_kph),
    description: data.current.condition.text,
    icon: data.current.condition.icon,
    feelsLike: Math.round(data.current.feelslike_c),
    condition: data.current.condition.text
  };

  const forecast = data.forecast.forecastday.map(day => ({
    date: new Date(day.date).toLocaleDateString(),
    tempMax: Math.round(day.day.maxtemp_c),
    tempMin: Math.round(day.day.mintemp_c),
    description: day.day.condition.text,
    icon: day.day.condition.icon,
    humidity: day.day.avghumidity,
    condition: day.day.condition.text
  }));

  return {
    current,
    forecast,
    location: {
      city: data.location.name,
      country: data.location.country
    }
  };
}