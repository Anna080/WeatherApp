import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';

import Weather from './components/weather';
import FavoriteCities from './components/favoriteCities';

interface City {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temperature: number;
    temperature_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: string;
    wind_kph: number;
    wind_dir: string;
    precip_mm: number;
    humidity: number;
    uv: number;
    dewpoint_c: number;
    dewpoint_f: number;
    pressure_mb: number;
    cloud: number;
    air_quality: any; // À définir selon la structure exacte de air_quality
  };
  hourlyForecast: {
    time: string;
    temperature: number;
    temperature_f: number;
    condition: string;
    wind_kph: number;
    pressure_mb: number;
    humidity: number;
    cloud: number;
    uv: number;
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
  }[];
}


const App = () => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [theme, setTheme] = useState('light');
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const backgroundImageSource = theme === 'light' ? require('./images/clouds.jpg') : require('./images/darkclouds.jpg');

  const addFavoriteCity = (city: City) => {
    setFavoriteCities((prevCities: City[]) => {
      if (!prevCities.some(prevCity => prevCity.location.name === city.location.name && prevCity.location.country === city.location.country)) {
        return [...prevCities, city];
      }
      return prevCities; // return the unchanged array if the city already exists
    });
  };
  

  const removeFavoriteCity = (cityname: string) => {
    setFavoriteCities((prevCities: City[]) => prevCities.filter(city => city.location.name !== cityname));
  };


  return (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.align}>
            <Text style={styles.title}>Weather</Text>
            <TouchableOpacity style={styles.toggleButtonContainer} onPress={toggleTemperatureUnit}>
              <Text style={styles.toggleButton}>
                {isCelsius ? 'Fahrenheit' : 'Celsius'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButtonContainer} onPress={toggleTheme}>
              <Text style={styles.toggleButton}>Toggle Theme</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <FavoriteCities favoriteCities={favoriteCities} removeFavoriteCity={removeFavoriteCity} isCelsius={isCelsius} />
          </View>
          <View style={styles.sectionContainer}>
            <Weather isCelsius={isCelsius} theme={theme} addFavoriteCity={addFavoriteCity} favoriteCities={favoriteCities} />
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  toggleButtonContainer: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  toggleButton: {
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default App;