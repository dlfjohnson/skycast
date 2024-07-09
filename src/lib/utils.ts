// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const getWeatherForecast = (response: any) => {
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      sunrise: daily.variables(2)!.valuesArray()!,
      sunset: daily.variables(3)!.valuesArray()!,
      precipitationSum: daily.variables(4)!.valuesArray()!,
      rainSum: daily.variables(5)!.valuesArray()!,
      showersSum: daily.variables(6)!.valuesArray()!,
    },
  };

  let forecast = [];

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    const { daily } = weatherData;
    const sunriseTime = daily.sunrise ? daily.sunrise[i] : ''
    const sunsetTime = daily.sunrise ? daily.sunset[i] : '';

    forecast.push({
      date:  weatherData.daily.time[i].toISOString(),
      maxTemp: weatherData.daily.temperature2mMax[i],
      minTemp: weatherData.daily.temperature2mMin[i],
      sunriseTime,
      sunsetTime,
      precipitation: weatherData.daily.precipitationSum[i],
      rainSum: weatherData.daily.rainSum[i],
      showersSum: weatherData.daily.showersSum[i]
    })
  }

  return forecast;
};

export const getCurrentWeather = (response: any) => {
  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const currentWeather = {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: current.variables(0)!.value(),
    relativeHumidity2m: current.variables(1)!.value(),
    apparentTemperature: current.variables(2)!.value(),
    precipitation: current.variables(3)!.value(),
    rain: current.variables(4)!.value(),
    showers: current.variables(5)!.value(),
    windSpeed10m: current.variables(6)!.value(),
  };

  return currentWeather;
};

/**
 * Rounds the given temperature value to the nearest integer.
 * @param temperature - The temperature value as a string.
 * @returns The temperature rounded to the nearest integer.
 */
export function roundTemperature(temperature: string): number {
  // Parse the temperature string to a float
  const tempValue = parseFloat(temperature);
  
  // Round the temperature to the nearest integer
  const roundedTemp = Math.round(tempValue);
  
  return roundedTemp;
};