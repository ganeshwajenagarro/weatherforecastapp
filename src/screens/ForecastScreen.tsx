import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { ForecastScreenRouteProp } from '../navigation/types';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { ForecastItem } from '../components/ForecastItem';
import { LoadingSpinner } from '../components/LoadingSpinner';

const ForecastScreen = () => {
  const route = useRoute<ForecastScreenRouteProp>();
  const { data, loading } = useSelector((state: RootState) => state.weather);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.forecast}
        keyExtractor={item => item.date}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
});

export default ForecastScreen;