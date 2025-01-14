import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { fetchWeatherByCity } from '../store/weatherSlice';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastItem from '../components/ForecastItem';

function HomeScreen() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  const handleSearch = async (city: string) => {
    try {
      await dispatch(fetchWeatherByCity({ city, days: 5 })).unwrap();
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar onSearch={handleSearch} />
      </View>
      <ScrollView style={styles.content}>
        {loading && (
          <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
          </View>
        )}
        
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {data && (
          <>
            <CurrentWeather
              data={data.current}
              location={data.location}
            />
            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>5-Day Forecast</Text>
              {data.forecast?.map((day) => (
                <ForecastItem key={day.date} forecast={day} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorTitle: {
    color: '#c62828',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorMessage: {
    color: '#c62828',
    fontSize: 14,
  },
  forecastContainer: {
    padding: 16,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  }
});

export default HomeScreen;