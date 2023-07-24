import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Wind = ({ wind_kph, wind_dir }) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  const mainDirections = ['N', 'E', 'S', 'W'];
  const barDirections = Array.from({ length: 16 });
  const windIndex = directions.indexOf(wind_dir);
  const windDeg = windIndex * 22.5;

  return (
    <View style={styles.container}>
      {barDirections.map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            index % 4 === 0 ? styles.barMain : styles.barLight,
            {
              transform: [
                { rotateZ: `${index * 22.5}deg` },
                { translateY: 80 },
              ],
            },
          ]}
        />
      ))}
      {mainDirections.map((direction, index) => (
        <Text
          key={index}
          style={[
            styles.direction,
            {
              transform: [
                { rotate: `${index * 90 - 90}deg` },
                { translateX: 90 },
              ],
            },
          ]}
        >
          {direction}
        </Text>
      ))}
      <Animated.View
        style={[
          styles.arrow,
          {
            transform: [
              { rotateZ: `${windDeg}deg` },
              { translateY: -37.5 }, // moitié de la hauteur de la flèche
            ],
          },
        ]}
      />
      <Text style={styles.windSpeed}>
        {wind_kph} km/h
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  direction: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    width: 24,
    textAlign: 'center',
    transformOrigin: 'center',
  },
  bar: {
    position: 'absolute',
    width: 1,
    height: 15,
    left: '50%',
    top: '50%',
  },
  barMain: {
    backgroundColor: 'black',
  },
  barLight: {
    height: 10,
    backgroundColor: 'grey',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 75,
    borderTopWidth: 75,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderTopColor: 'transparent',
    transformOrigin: 'center',
  },
  windSpeed: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default Wind;
