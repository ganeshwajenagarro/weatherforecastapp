import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WeatherData } from '../types/weather';

interface Props {
  data: WeatherData['current'];
  location: WeatherData['location'];
}

function CurrentWeather({ data, location }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>
        {location.city}, {location.country}
      </Text>
      <Text style={styles.temperature}>{data.temp}°C</Text>
      <Text style={styles.feelsLike}>Feels like {data.feelsLike}°C</Text>
      <Image
        source={{ uri: `https:${data.icon}` }}
        style={styles.icon}
      />
      <Text style={styles.description}>{data.condition}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Humidity: {data.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>Wind: {data.windSpeed} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  location: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 20,
    textTransform: 'capitalize',
    marginVertical: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CurrentWeather;