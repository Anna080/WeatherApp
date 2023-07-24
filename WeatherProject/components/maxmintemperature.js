import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaxMinTemperature = ({ hourlyForecast, isCelsius }) => {
  let maxTemperature = -Infinity;
  let minTemperature = Infinity;

  hourlyForecast.forEach((hour) => {
    const temperature = isCelsius ? hour.temperature : hour.temperature_f;
    if (temperature > maxTemperature) {
      maxTemperature = temperature;
    }
    if (temperature < minTemperature) {
      minTemperature = temperature;
    }
  });

  return (
    <View>
      <Text style={styles.center}>
        Higher: {maxTemperature}°{isCelsius ? 'C' : 'F'} Lower: {minTemperature}°{isCelsius ? 'C' : 'F'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});

export default MaxMinTemperature;
