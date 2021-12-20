// Requests weather data from worker. Returns an organised object.
const fetchWeather = async (loc) => {
  const response = await fetch(`/weather/${loc}`);
  if (!response.ok) {
    throw new Error(`An Error has occured: ${response.status}`);
  }
  const jsonResponse = await response.json()
  const weatherData = {
    location: jsonResponse.name,
    tempMin: Number.parseFloat(jsonResponse.main.temp_min-273.15).toFixed(1),
    tempMax: Number.parseFloat(jsonResponse.main.temp_max-273.15).toFixed(1),
    wind: Number.parseFloat(jsonResponse.wind.speed).toFixed(1),
    weather: jsonResponse.weather[0].main,
    icon: `http://openweathermap.org/img/wn/${jsonResponse.weather[0].icon}@2x.png`
  }
  return weatherData;
}

export default fetchWeather;
