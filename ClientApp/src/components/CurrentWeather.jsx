import React from "react";

function CurrentWeather(props) {
    console.log(props.data);
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim().toUpperCase();
    const current = props.data.current;
    return(
        <div className="currentWrapper">
            <div className="d-flex flex-column"></div>
            <div className="d-flex flex-column">
                <h1 className="font">{city}</h1>
                <ul className="font">
                    <li>Current Temprature: {current.temp}°</li>
                    <li>Feels Like: {current.feels_like}°</li>
                    <li>Humidity: {current.humidity}%</li>
                    <li>UV-Index: {current.uvi}</li>
                    <li>{current.clouds}% Cloud Coverage</li>
                </ul>
            </div>
            <div className="d-flex flex-column"></div>
           
        </div>
    )
}

export default CurrentWeather;