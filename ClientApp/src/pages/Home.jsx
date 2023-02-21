import React, { useState } from 'react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import fetchWeather from "../utils/fetchWeather";

function Home() {
    const [weatherData, setWeatherData] = useState(null);

    const getWeather = async () => {
      try {
        const response = await fetchWeather.getWeather();
        setWeatherData(response);
      } catch (error) {
        console.log(error);
      }
    };
    return (
        <div>
            <Header onClick={getWeather} />
            {weatherData && <CurrentWeather data={weatherData} />}
        </div>
        )
}

export default Home;