export interface WeatherData {
    current: {
      temp: number;
      humidity: number;
      windSpeed: number;
      description: string;
      icon: string;
      feelsLike: number;
      condition: string;
    };
    forecast: ForecastDay[];
    location: {
      city: string;
      country: string;
    };
  }
  
  export interface ForecastDay {
    date: string;
    tempMax: number;
    tempMin: number;
    description: string;
    icon: string;
    humidity: number;
    condition: string;
  }
  
export interface WeatherApiResponse {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      humidity: number;
      wind_kph: number;
      condition: {
        text: string;
        icon: string;
      };
      feelslike_c: number;
    };
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avghumidity: number;
          condition: {
            text: string;
            icon: string;
          };
        };
      }>;
    };
  }