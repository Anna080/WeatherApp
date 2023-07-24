import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const interpretPrecipitation = (precipMM) => {
  if (precipMM > 0.7) {
    return 'Extreme';
  } else if (precipMM > 0.5) {
    return 'Heavy';
  } else if (precipMM > 0.3) {
    return 'Moderate';
  } else {
    return 'Light';
  }
};

const PrecipitationBar = ({ precipMM }) => {
  const precipitationLevel = interpretPrecipitation(precipMM);
  const markerPosition = precipMM * 100; 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`Precipitation: ${precipitationLevel}`}</Text>
      <LinearGradient 
        style={styles.bar} 
        colors={['green', 'yellow', 'orange', 'red']} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}}
      >
        <View style={[styles.marker, {left: `${markerPosition}%`}]} />
      </LinearGradient>
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
    overflow: 'hidden', // to ensure the LinearGradient respects the borderRadius
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    top: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16
  },
});

export default PrecipitationBar;
