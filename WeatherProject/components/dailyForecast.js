import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const DailyForecast = ({ cityName, isCelsius }) => {
  const [weekForecast, setWeekForecast] = useState([]);

  const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
      Papa.parse(filePath, {
        download: true,
        header: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];

    const fetchAllData = async () => {
      try {
        const maxData = await readCSV(`/Users/annadiaw/Desktop/PA/forecast_data/${cityName}_tmax_forecast.csv`);
        const moyData = await readCSV(`/Users/annadiaw/Desktop/PA/forecast_data/${cityName}_tmoy_forecast.csv`);
        const minData = await readCSV(`/Users/annadiaw/Desktop/PA/forecast_data/${cityName}_tmin_forecast.csv`);

        const mergedData = maxData.map(maxEntry => {
          const moyEntry = moyData.find(entry => entry.date === maxEntry.date);
          const minEntry = minData.find(entry => entry.date === maxEntry.date);
          return {
            date: maxEntry.date,
            tmax: maxEntry.tmax,
            tmoy: moyEntry ? moyEntry.tmoy : null,
            tmin: minEntry ? minEntry.tmin : null,
          };
        });

        const next7DaysData = mergedData.filter(d => {
          const dateObj = new Date(d.date);
          const currentObj = new Date(currentDate);
          const diffInDays = (dateObj - currentObj) / (1000 * 60 * 60 * 24);
          return diffInDays >= 0 && diffInDays < 7;
        });

        setWeekForecast(next7DaysData);

      } catch (error) {
        console.error("Erreur lors de la lecture du CSV:", error);
      }
    };

    fetchAllData();

  }, [cityName]);

    return (
        <View style={styles.listContainer}>
        {weekForecast.map(item => (
            <View key={item.date} style={styles.container}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.temp}>Max: <Text style={styles.value}>{isCelsius ? Math.round(item.tmax) : Math.round((item.tmax * 9/5) + 32)}{isCelsius ? "°C" : "°F"}</Text></Text>
            <Text style={styles.temp}>Moy: <Text style={styles.value}>{isCelsius ? Math.round(item.tmoy) : Math.round((item.tmoy * 9/5) + 32)}{isCelsius ? "°C" : "°F"}</Text></Text>
            <Text style={styles.temp}>Min: <Text style={styles.value}>{isCelsius ? Math.round(item.tmin) : Math.round((item.tmin * 9/5) + 32)}{isCelsius ? "°C" : "°F"}</Text></Text>
            </View>
        ))}
        </View>
    );
  
}

const styles = StyleSheet.create({
    listContainer: {
      flex: 1,
    },
    container: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: '#f8f8f8',
      marginVertical: 2,
    },
    date: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    temp: {
      marginVertical: 3,
    },
    value: {
      fontWeight: 'bold',
      color: '#333',
    },
  });
  

export default DailyForecast;