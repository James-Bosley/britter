import { useEffect, useState } from 'react';
import fetchWeather from '../util/weatherApi';

function Weather() {

  // Manages weather data state.
  const [weather, setWeather] = useState([])

  const locations = ['london', 'edinburgh', 'cardiff', 'belfast'];

  // Dispatches weather data requests for locations in array.  
  const loadWeather = async() => {
    const weatherData = [];
    await Promise.all(locations.map(async(x) => {
      const data = await fetchWeather(x);
      weatherData.push(data);
    }))
    return weatherData.sort((a,b) => a.location + b.location);
  }

  // Loads data asyncrouously to prevent UI blocking, and call a refresh every minute.
  useEffect(() => { 
    const firstLoad = async() => {
      setWeather(await loadWeather());
    }
    firstLoad()
    const refresh = setInterval(async() => {
      setWeather(await loadWeather());
    }, 1000 * 60)
    // Clears interval on unmounting to prevent memory leak.
    return () => clearInterval(refresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renders weather data.
  return (
    Object.keys(weather).length !== 4 ? <h4 className='weatherContainer'>Loading weather...</h4> :
    <div className='weatherContainer'>
      {weather.map(x => {
      return <div className='weatherBox' key={x.location}>
        <h4>{x.location}</h4>
        <p>{x.weather}</p>
        <img src={x.icon} alt='weather icon'/>
        <p>Min temp: {x.tempMin}&deg;C<br/>Max temp: {x.tempMax}&deg;C<br/>Wind: {x.wind}mph</p>
      </div>})}
    </div>
  )  
}

export default Weather;
