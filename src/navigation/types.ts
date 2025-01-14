import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Forecast: { city: string };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ForecastScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Forecast'>;
export type ForecastScreenRouteProp = RouteProp<RootStackParamList, 'Forecast'>;