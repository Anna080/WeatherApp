import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const interpretAirQuality = (airQuality) => {
  const levels = {
    1: { 'quality': 'Good', 'advice': 'No particular precautions are necessary.' },
    2: { 'quality': 'Moderate', 'advice': 'Sensitive people should avoid intense physical exertion.' },
    3: { 'quality': 'Unhealthy for sensitive group', 'advice': 'People with respiratory or heart disease, the elderly and children should limit prolonged exertion.' },
    4: { 'quality': 'Unhealthy', 'advice': 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
    5: { 'quality': 'Very Unhealthy', 'advice': 'Health alert: The risk of health effects is increased for everyone.' },
    6: { 'quality': 'Hazardous', 'advice': 'Health warning of emergency conditions: everyone is more likely to be affected.' }
  };

  return levels[airQuality['us-epa-index']];
};

const AirQuality = ({ airData }) => {
  if (!airData) {
    return null;
  }

  const airQualityInfo = interpretAirQuality(airData);

  const colors = {
    'Good': ['#76b852', '#8DC26F'],
    'Moderate': ['#FDBB2D', '#22c1c3'],
    'Unhealthy for sensitive group': ['#F7B733', '#FC4A1A'],
    'Unhealthy': ['#FF512F', '#DD2476'],
    'Very Unhealthy': ['#AA076B', '#61045F'],
    'Hazardous': ['#1D4350', '#A43931']
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
      <Text style={styles.text}>{`AirQuality: ${airQualityInfo.quality}`}</Text>
      </View>
      <View style={styles.item}>
      <LinearGradient colors={colors[airQualityInfo.quality]} style={{ height: 200 }}>
        <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}>
          {`${airQualityInfo.advice}`}
        </Text>
      </LinearGradient>
    </View>
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

export default AirQuality;
