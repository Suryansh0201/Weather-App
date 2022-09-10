import {WEATHER_API_URL, WEATHER_API_KEY} from './api';
import './App.css';
import CurrentWeather from './components/Current-weather/current-weather';
import Search from './components/Search/search';
import {useState as UseState} from 'react'
import Forecast from './components/Forecast-weather/forecast-weather';

function App() {

  const [currentWeather, setCurrentWeather] = UseState(null);
  const [currentForecast, setCurrentForecast] = UseState(null);
  const handleOnSearchChange = (searchData) =>{
  const [lat, lon]=searchData.value.split(" ");
  const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
       .then(async(response) =>{
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city:searchData.label , ...weatherResponse});
        setCurrentForecast({city:searchData.label, ...forecastResponse});
       })
       .catch((err)=>{
        console.log(err)
       });
       console.log(currentForecast)
  }
  console.log(currentWeather);
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}
      />
      {currentWeather && <CurrentWeather  data ={currentWeather} />}
      {currentForecast && <Forecast data = {currentForecast}/>}
    </div>
  );
}

export default App;
