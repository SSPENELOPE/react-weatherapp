import React from "react";

function CurrentWeather(props) {
    const current = props.data.current || JSON.parse(localStorage.getItem("weatherData")).current;
    const city = JSON.parse(localStorage.getItem("currentCity"));
    return(
        <div className="currentWrapper">
            <div className="d-flex flex-column"></div>
            <div className="d-flex flex-column">
                <h1 className="font">{city}</h1>
                <ul className="font data-list">
                    <h2 className="font"><u>Current Temprature</u></h2>
                        <li className="data">{current.temp}°</li>
                    <h2 className="font"><u>Feels Like</u></h2>
                        <li className="data">{current.feels_like}°</li>
                    <h2 className="font"><u>Humidity</u></h2>
                        <li className="data">{current.humidity}%</li>
                    <h2 className="font"><u>UV-Index</u></h2>
                        <li className="data">{current.uvi}</li>
                    <h2 className="font"><u>Clouds</u></h2>
                    <li className="data">{current.clouds}% Cloud Coverage</li>
                </ul>
            </div>
            <div className="d-flex flex-column"></div>   
        </div>
    )
}

export default CurrentWeather;