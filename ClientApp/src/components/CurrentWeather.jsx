import React from "react";

function CurrentWeather(props) {
    console.log(props.data);
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const current = props.data.current;
    return(
        <div>
            <h1>{city.toUpperCase()}</h1>
        </div>
    )
}

export default CurrentWeather;