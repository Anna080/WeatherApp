import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatHour = (time, hour) => {
  const specificHour = time.slice(11, 13);
  return `${specificHour}h`;
};

const calculateAverageHumidity = (hourlyForecast) => {
  const totalHumidity = hourlyForecast.reduce((sum, { humidity }) => sum + humidity, 0);
  const averageHumidity = totalHumidity / hourlyForecast.length;
  return Math.round(averageHumidity);
};

const Humidity = ({ currentHumidity, hourlyForecast, currentHour }) => {
  const currentLevel = currentHumidity <= 30 ? 'Low' : currentHumidity <= 60 ? 'Moderate' : 'High';

  const hourlyLevels = hourlyForecast.map(({ time, humidity }) => ({
    time: formatHour(time, currentHour),
    level: humidity <= 30 ? 'Low' : humidity <= 60 ? 'Moderate' : 'High',
  }));

  let message = `Humidity is ${currentLevel.toLowerCase()} at the moment.`;

  const highLevels = hourlyLevels.filter(({ level }) => level === 'High');

  if (highLevels.length > 0) {
    const startTime = highLevels[0].time;
    const endTime = highLevels[highLevels.length - 1].time;
    message = `Humidity will be high from ${startTime} to ${endTime}.`;
  }

  const averageHumidity = calculateAverageHumidity(hourlyForecast);
  const averageMessage = `Today, the average humidity is ${averageHumidity}%.`;

  return (
    <View style={styles.container}>
      <Text style={styles.t}>{`${currentHumidity}% `}</Text>
      <Text style={styles.text}>{`${currentLevel} Humidity`}</Text>
      <Text style={styles.averageMessage}>{averageMessage}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  t: {
    fontSize: 50,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginTop: 5,
  },
  averageMessage: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Humidity;
