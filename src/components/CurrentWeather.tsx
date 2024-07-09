import { roundTemperature } from '../lib/utils';

type CurrentWeatherProps = {
  forecast: any,
  currentWeather: any,
};

const CurrentWeather = ({ forecast, currentWeather }: CurrentWeatherProps) => {
  const { temperature2m, apparentTemperature } = currentWeather || {};

  return (
    <section className="sc-current-weather">
      <h4>Current Weather</h4>
      <div className="sc-current-weather__container">
        <div><h1>{roundTemperature(temperature2m)}&deg; F</h1></div>
        <div>Feels like {roundTemperature(apparentTemperature)}&deg; F</div>
      </div>
      <div>
        <br/>
        <div>The high will be {roundTemperature(forecast[0].maxTemp)}&deg;</div>
      </div>
    </section>
  )
}

export default CurrentWeather