import React from "react";
import HourlyWeather from "./HourlyWeather";

function CurrentWeather(props) {
    const current = props.data.current || JSON.parse(localStorage.getItem("weatherData")).current;
    const hourly = props.data.hourly || JSON.parse(localStorage.getItem("weatherData")).hourly;
    const city = JSON.parse(localStorage.getItem("currentCity"));
    return (
        <div className="currentWrapper">
            
            <h1 className="display-3"><u>{city}</u></h1>
            <div className="d-flex flex-row justify-content-around">
              
                <div className="d-flex flex-column currentBox">
                <h1 className="text-center font bg-dark">Your Current Weather</h1>
                    <ul className="font data-list">
                        <h2 className="font"><u>Current Temprature</u></h2>
                            <li className="data">{Math.round(current.temp)}<span>&#8457;</span></li>
                        <h2 className="font"><u>Feels Like</u></h2>
                            <li className="data">{Math.round(current.feels_like)}<span>&#8457;</span></li>
                        <h2 className="font"><u>Humidity</u></h2>
                            <li className="data">{current.humidity}%</li>
                        <h2 className="font"><u>UV-Index</u></h2>
                            <li className="data">{current.uvi}</li>
                        <h2 className="font"><u>Clouds</u></h2>
                            <li className="data">{current.clouds}% Cloud Coverage</li>
                    </ul>
                </div>

                <div className="d-flex flex-column currentBox">
                    <HourlyWeather hourly={hourly} />
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;