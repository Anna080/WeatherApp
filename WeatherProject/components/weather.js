import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from './search';
import AirQuality from './airQuality';
import MaxMinTemperature from './maxmintemperature';
import HourlyForecast from './hourlyForecast';
import Precipitation from './precipitation';
import FeelsLike from './feelsLike';
import Wind from './wind';
import UVIndex from './uvIndex';
import Humidity from './humidity';
import Pressure from './pressure';
import DailyForecast from './dailyForecast';

const Weather = ({ isCelsius, theme, addFavoriteCity, favoriteCities }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sectionStates, setSectionStates] = useState({
    airQuality: true,
    hourlyForecast: true,
    uvIndex: true,
    dayforecast: true,
    wind: true,
    precipitation: true,
    feelsLike: true,
    humidity: true,
    pressure: true,
  });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    const cityIds = favoriteCities.map((city) => `${city.location.name}, ${city.location.country}`);
    setIsFavorite(cityIds.includes(`${selectedCity?.nom}, ${selectedCity?.pays}`));
  }, [favoriteCities, selectedCity]);

  const fetchWeatherData = async (city) => {
    const cachedCity = favoriteCities.find((favCity) => favCity.location.name === city.nom && favCity.location.country === city.pays);
    if (cachedCity) {
      setWeatherData(cachedCity);
    } else {
      const response = await fetch(`http://localhost:3000/weather/${city.nom}, ${city.pays}`);
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const currentThemeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const handleAddToFavorites = () => {
    if (selectedCity && weatherData) {
      addFavoriteCity(weatherData);
    }
  };

  return (
    <View style={currentThemeStyles.container}>
      <Search onSelect={handleCitySelect} />
      {selectedCity && weatherData && weatherData.location && weatherData.current && weatherData.current.condition && weatherData.current.air_quality && weatherData.hourlyForecast && weatherData.current.pressure_mb && (
        <>
          <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
            <Text style={[currentThemeStyles.center, currentThemeStyles.subtitle]}>
              {selectedCity.nom}, {selectedCity.pays}
            </Text>
            <Text style={[currentThemeStyles.center, currentThemeStyles.subtitle]}>
              {isCelsius
                ? `${weatherData?.current?.temperature} °C`
                : `${weatherData?.current?.temperature_f} °F`}
              {' | '}
              {weatherData.current.condition}
            </Text>
            <MaxMinTemperature hourlyForecast={weatherData.hourlyForecast} isCelsius={isCelsius} />
            <TouchableOpacity onPress={handleAddToFavorites}>
              <View style={currentThemeStyles.addToFavoritesButton}>
                <Icon name="heart" style={[currentThemeStyles.addToFavoritesIcon, isFavorite && currentThemeStyles.addToFavoritesIconRed]} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => toggleSection('airQuality')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="asterisk" style={currentThemeStyles.iconStyle} /> AIR QUALITY
              </Text>
              {sectionStates.airQuality && <AirQuality airData={weatherData.current.air_quality} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('hourlyForecast')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="clock-o" style={currentThemeStyles.iconStyle} /> HOURLY FORECAST
              </Text>
              {sectionStates.hourlyForecast && (
                <HourlyForecast hourlyForecast={weatherData.hourlyForecast} isCelsius={isCelsius} />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('dayforecast')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="calendar" style={currentThemeStyles.iconStyle} /> 7-DAY FORECAST
              </Text>
              {sectionStates.dayforecast && <DailyForecast cityName={selectedCity.nom} isCelsius={isCelsius} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('uvIndex')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="sun-o" style={currentThemeStyles.iconStyle} /> UV INDEX
              </Text>
              {sectionStates.uvIndex && <UVIndex currentUVIndex={weatherData.current.uv} hourlyForecast={weatherData.hourlyForecast} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('wind')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="fa-wind" style={currentThemeStyles.iconStyle} /> WIND
              </Text>
              {sectionStates.wind && <Wind wind_dir={weatherData.current.wind_dir} wind_kph={weatherData.current.wind_kph} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('precipitation')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="tint" style={currentThemeStyles.iconStyle} /> PRECIPITATION
              </Text>
              {sectionStates.precipitation && <Precipitation precipMM={weatherData.current.precip_mm} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('feelsLike')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="thermometer-empty" style={currentThemeStyles.iconStyle} /> FEELS LIKE
              </Text>
              {sectionStates.feelsLike && (
                <FeelsLike
                  currentTemperature={isCelsius ? weatherData.current.temperature_c : weatherData.current.temperature_f}
                  feelsLikeTemperature={isCelsius ? weatherData.current.feelslike_c : weatherData.current.feelslike_f}
                  forecast={weatherData.hourlyForecast}
                  isCelsius={isCelsius}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('humidity')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="water" style={currentThemeStyles.iconStyle} /> HUMIDITY
              </Text>
              {sectionStates.humidity && <Humidity currentHumidity={weatherData.current.humidity} hourlyForecast={weatherData.hourlyForecast} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSection('pressure')}>
            <View style={[currentThemeStyles.sectionContainer, currentThemeStyles.shadowProp]}>
              <Text style={currentThemeStyles.sectionTitle}>
                <Icon name="thermometer-empty" style={currentThemeStyles.iconStyle} /> PRESSURE
              </Text>
              {sectionStates.pressure && <Pressure pressure={weatherData.current.pressure_mb} />}
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const lightThemeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginLeft: 6,
  },
  sectionContainer: {
    margin: 10,
    marginLeft: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    opacity: 0.7,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: 'black',
  },
  sectionTitle: {
    marginTop: -10,
    marginLeft: -15,
    opacity: 0.7,
  },
  iconStyle: {
    margin: -40,
    opacity: 10,
  },
  addToFavoritesButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  addToFavoritesIcon: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  addToFavoritesIconRed: {
    color: 'red',
  },
});

const darkThemeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginLeft: 6,
  },
  sectionContainer: {
    margin: 10,
    marginLeft: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: { width: -5, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    opacity: 0.7,
  },
  center: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: 'black',
  },
  sectionTitle: {
    marginTop: -10,
    marginLeft: -15,
    opacity: 0.7,
  },
  iconStyle: {
    margin: -40,
    opacity: 10,
  },
  addToFavoritesButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  addToFavoritesIcon: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
  },
  addToFavoritesIconRed: {
    color: 'red',
  },
});

export default Weather;
