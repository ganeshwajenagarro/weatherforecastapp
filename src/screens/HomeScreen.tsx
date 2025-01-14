// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { HomeScreenNavigationProp } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { fetchWeatherByCity } from '../store/weatherSlice';
import { SearchBar } from '../components/SearchBar';
import { CurrentWeather } from '../components/CurrentWeather';
import { LoadingSpinner } from '../components/LoadingSpinner';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  const handleSearch = async (city: string) => {
    try {
      await dispatch(fetchWeatherByCity(city)).unwrap();
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <LoadingSpinner />}
      {error && <Text style={styles.error}>{error}</Text>}
      {data && (
        <CurrentWeather
          data={data.current}
          location={data.location}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 16,
  },
});

// Make sure to export the component as default
export default HomeScreen;