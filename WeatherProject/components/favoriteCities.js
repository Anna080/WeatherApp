import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoriteCities = ({ favoriteCities, removeFavoriteCity, isCelsius }) => {
  return (
    <View>
      {favoriteCities.map((city) => (
        <View key={city.location.name} style={[styles.cityContainer, styles.shadowProp]}>
          <View style={styles.cityInfo}>
            <Text style={styles.cityName}>{city.location.name}</Text>
            <Text style={styles.cityCountry}>{city.location.country}</Text>
            <Text style={styles.cityTime}>{city.location.localtime.split(' ')[1]}</Text>
            <Text style={styles.cityWeather}>{city.current.condition}</Text>
          </View>

          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>
              {isCelsius ? `${city.current.temperature} °C` : `${city.current.temperature_f} °F`}
            </Text>
          </View>

          <Icon
            name="heart"
            style={styles.removeIcon}
            onPress={() => removeFavoriteCity(city.location.name)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    opacity: 0.7,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
  },
  cityCountry: {
    fontSize: 12,
    color: '#666',
  },
  cityTime: {
    fontSize: 12,
  },
  cityWeather: {
    fontSize: 12,
  },
  temperatureContainer: {
    paddingHorizontal: 10,
  },
  temperature: {
    fontSize: 16,
  },
  removeIcon: {
    fontSize: 16,
    color: 'red',
  },
});

export default FavoriteCities;
