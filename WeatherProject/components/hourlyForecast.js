import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HourlyForecast = ({ hourlyForecast, isCelsius }) => {
  return (
    <ScrollView style={styles.container}>
      {hourlyForecast.map((forecast, index) => {
        // Extract hour from date
        const date = new Date(forecast.time);
        const hour = date.getHours().toString().padStart(2, '0'); // Get hour and format as 2-digit string

        return (
          <View key={index} style={styles.item}>
            <Text style={styles.text}>{hour}h | {isCelsius ? forecast.temperature : forecast.temperature_f}°{isCelsius ? 'C' : 'F'}</Text>
            <Text style={styles.text}>{forecast.condition}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
});

export default HourlyForecast;
