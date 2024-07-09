import { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

export const useGetWeather = (longitude: number | null, latitude: number | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (!longitude || !latitude) return;

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const params = {
          "latitude": latitude,
          "longitude": longitude,
          "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation", "rain", "showers", "wind_speed_10m"],
          "daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "precipitation_sum", "rain_sum", "showers_sum"],
          "temperature_unit": "fahrenheit",
          "timezone": "America/New_York",
          "forecast_days": 5
        };
        const url = "https://api.open-meteo.com/v1/forecast";
        const data = await fetchWeatherApi(url, params);

        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [longitude, latitude]);

  return { isLoading, data, error };
};
