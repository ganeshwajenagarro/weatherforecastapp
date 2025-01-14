import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ForecastDay } from '../types/weather';

interface Props {
  forecast: ForecastDay;
}

export const ForecastItem: React.FC<Props> = ({ forecast }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{forecast.date}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`,
          }}
          style={styles.icon}
        />
        <Text style={styles.description}>{forecast.description}</Text>
      </View>
      <View style={styles.tempContainer}>
        <Text style={styles.tempMax}>{forecast.tempMax}°</Text>
        <Text style={styles.tempMin}>{forecast.tempMin}°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateContainer: {
    flex: 2,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  weatherContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  description: {
    fontSize: 14,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  tempContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  tempMax: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tempMin: {
    fontSize: 16,
    color: '#666',
  },
});
