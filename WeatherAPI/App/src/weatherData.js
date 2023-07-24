class WeatherData {
  constructor(data) {
    this.location = {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      tz_id: data.location.tz_id,
      localtime_epoch: data.location.localtime_epoch,
      localtime: data.location.localtime
    };
    this.current = {
      temperature: data.current.temp_c,
      temperature_f: data.current.temp_f,
      feelslike_c: data.current.feelslike_c,
      feelslike_f: data.current.feelslike_f,
      condition: data.current.condition.text,
      wind_kph: data.current.wind_kph,
      wind_dir: data.current.wind_dir,
      precip_mm: data.current.precip_mm,
      humidity: data.current.humidity,
      uv: data.current.uv, 
      dewpoint_c: data.current.dewpoint_c,
      dewpoint_f: data.current.dewpoint_f,
      pressure_mb: data.current.pressure_mb,
      humidity: data.current.humidity,
      cloud: data.current.cloud,
      air_quality: data.current.air_quality,
    };
    this.hourlyForecast = data.forecast.forecastday[0].hour.map(item => {
      return {
        time: item.time,
        temperature: item.temp_c,
        temperature_f: item.temp_f,
        condition: item.condition.text,
        wind_kph: item.wind_kph,
        pressure_mb: item.pressure_mb,
        humidity: item.humidity,
        cloud: item.cloud,
        uv: item.uv,
        dewpoint_c: item.dewpoint_c,
        dewpoint_f: item.dewpoint_f,
        feelslike_c: item.feelslike_c,
        feelslike_f: item.feelslike_f,
      }
    });
  }
}

module.exports = WeatherData;
