import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import FiveDay from '../components/FiveDay';
import fetchWeather from "../utils/fetchWeather";

function Home() {
/********************* City Handling ****************/
 /* This will check to see if we have a city name stored, if we dont set the state to empty string */
  const [city, setCity] = useState(() => {
    const currentCity = localStorage.getItem("currentCity");
    return currentCity ? JSON.parse(currentCity) : "";
  });

  /* We will pass this as a prop to the header which contains the city search input,
   from there we will update the "city" state and set the local storage for persistency */
  const handleCityChange = (event) => {
    let city = event.target.value.trim().toUpperCase();
    localStorage.setItem("currentCity",JSON.stringify(city))
  };


  /****************** API data Handling ****************/
  // This will save the weather data from the search to local storage and enable persistency on page refresh 
  const [weatherData, setWeatherData] = useState(() => {
    const storedData = localStorage.getItem('weatherData');
    return storedData ? JSON.parse(storedData) : "";
  });

  // If you wanted to enable a search immediatly on page load you can use this hook, this would require modifying the api call in fetchWeather.js
  /*     useEffect(() => {
          if (!weatherData) {
              getWeather();
          }
      }, []); */

  // Func to get weather, passed as a prop to the header
  const getWeather = async () => {
    try {
      const response = await fetchWeather.getWeather();
      setWeatherData(response);
      localStorage.setItem('weatherData', JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header onClick={getWeather} onChange={handleCityChange} />
      {weatherData && <CurrentWeather data={weatherData} city={city} />}
      {weatherData && <FiveDay data={weatherData} city={city} />}
    </div>
  );
}

export default Home;