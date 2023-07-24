import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeelsLike = ({ currentTemperature, feelsLikeTemperature, forecast, isCelsius }) => {
    const temperatures = forecast.map((hour) => isCelsius ? hour.feelslike_c : hour.feelslike_f);
    const maxFeelsLike = Math.max(...temperatures);
    const minFeelsLike = Math.min(...temperatures);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>The temperature currently feels like {feelsLikeTemperature}°{isCelsius ? 'C' : 'F'} but it is {currentTemperature}°{isCelsius ? 'C' : 'F'}.</Text>
            <Text style={styles.text}>Today's temperature range felt like {minFeelsLike}°{isCelsius ? 'C' : 'F'} to {maxFeelsLike}°{isCelsius ? 'C' : 'F'}.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 5,
    },
    text: {
      fontSize: 16,
    },
});

export default FeelsLike;
