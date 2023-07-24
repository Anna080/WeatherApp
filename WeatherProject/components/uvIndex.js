import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const interpretUVIndex = (uvIndex) => {
  if (uvIndex >= 8) {
    return 'Extreme';
  } else if (uvIndex >= 6) {
    return 'High';
  } else if (uvIndex >= 3) {
    return 'Moderate';
  } else {
    return 'Low';
  }
};

const formatHour = (time) => {
  const hour = time.slice(11, 13);
  return `${hour}h`;
};

const calculateMarkerPosition = (uvIndex) => {
  const maxUVIndex = 10; // Maximum UV index value
  const markerPosition = (uvIndex / maxUVIndex) * 100;
  return `${markerPosition}%`;
};

const UVIndex = ({ currentUVIndex, hourlyForecast }) => {
  const currentLevel = interpretUVIndex(currentUVIndex);

  const hourlyLevels = hourlyForecast.map(({ time, uv }) => ({
    time: formatHour(time),
    level: interpretUVIndex(uv),
  }));

  let message = `Low for the rest of the day.`;

  const highLevels = hourlyLevels.filter(({ level }) => level !== 'Low');

  if (highLevels.length > 0) {
    const startTime = highLevels[0].time;
    const endTime = highLevels[highLevels.length - 1].time;
    message = `Levels of ${highLevels[0].level} or higher from ${startTime} to ${endTime}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.t}>{`UV Index: ${currentLevel}`}</Text>
      <LinearGradient
        style={styles.bar}
        colors={['green', 'yellow', 'orange', 'red']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={[styles.marker, { left: calculateMarkerPosition(currentUVIndex) }]} />
      </LinearGradient>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  bar: {
    height: 20,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    top: -5,
    width: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  markerText: {
    fontSize: 12,
    color: 'white',
  },
  markerHour: {
    fontSize: 10,
    color: 'white',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  t:{
    fontSize: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default UVIndex;
