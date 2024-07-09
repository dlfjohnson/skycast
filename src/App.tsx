import { useEffect, useState } from 'react';
import { useGetWeather } from './hooks/useGetWeather';
import { getWeatherForecast, getCurrentWeather } from './lib/utils';
import { Location } from './types/types';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import LocationWidget from './components/LocationWidget';
import Header from './components/Header';
import './styles/App.scss';

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const { isLoading, data } = useGetWeather(longitude, latitude);
  const [forecast, setForecast] = useState<any[]>([]);
  const [currentWeather, setCurrentWeather] = useState<any>({});

  useEffect(() => {
    if (location?.longitude && location?.latitude) {
      setLongitude(location.longitude);
      setLatitude(location.latitude);
    }
  }, [location])

  useEffect(() => {
    if (!isLoading && data) {
      const currentWeather = getCurrentWeather(data[0]);
      setCurrentWeather(currentWeather);
      const weatherForecast = getWeatherForecast(data[0]);
      setForecast(weatherForecast);
    }
  }, [data, isLoading])

  return (
    <div className="skycast">
      <Header
        data={location}
        setLocation={setLocation}
      />
      <div className="skycast__row-one">
        {location && <LocationWidget location={location} />}
        {location && forecast.length > 0 &&
          <CurrentWeather
            forecast={forecast}
            currentWeather={currentWeather}
          />
        }
      </div>
      {isLoading ?
        <div></div>
        :
        forecast.length > 0 && <Forecast forecast={forecast} />
      }
    </div>
  );
}

export default App;
