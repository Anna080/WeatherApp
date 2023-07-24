const axios = require('axios');
const express = require('express');
const { MongoClient } = require('mongodb');
const WeatherData = require('./weatherData');

const PORT = 3000;
const WEATHERAPI_KEY = '322edaf79ce448498ad192504230706';
const MONGODB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'weather_base';
const CACHE_EXPIRATION_TIME = 3600;

async function main() {
  const client = await MongoClient.connect(MONGODB_URL);
  const db = client.db(DB_NAME);
  const cacheCollection = db.collection('cache');

  const app = express();

  app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;

    try {
      const cachedData = await cacheCollection.findOne({ city });

      if (cachedData && isCacheValid(cachedData)) {
        console.log('Données météorologiques récupérées depuis le cache');
        displayWeatherData(res, cachedData.data);
      } else {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_KEY}&q=${city}&days=1&hourly=24&aqi=yes`);
        const data = response.data;

        storeInCache(cacheCollection, city, data);

        const formattedData = new WeatherData(data);
        displayWeatherData(res, formattedData);
      }
    } catch (error) {
      console.error('Erreur lors de la requête API :', error);
      res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

function isCacheValid(cachedData) {
  const currentTime = new Date().getTime() / 1000;
  const cacheTime = cachedData.timestamp;
  return currentTime - cacheTime < CACHE_EXPIRATION_TIME;
}

function storeInCache(cacheCollection, city, data) {
  const currentTime = new Date().getTime() / 1000;
  const cachedData = {
    city: city,
    data: data,
    timestamp: currentTime
  };

  cacheCollection.updateOne({ city: city }, { $set: cachedData }, { upsert: true })
    .then(() => {
      console.log('Données météorologiques mises en cache');
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour du cache :', error);
    });
}

function displayWeatherData(res, data) {
  res.json(data);
}

main().catch((error) => {
  console.error('Erreur lors de l\'exécution du serveur :', error);
});
