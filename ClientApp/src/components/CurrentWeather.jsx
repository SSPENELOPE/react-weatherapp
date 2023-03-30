import React, { useState, useEffect } from "react";
import HourlyWeather from "./HourlyWeather";
import Cookies from 'js-cookie';


function CurrentWeather(props) {
    // Our state variables to manage the page
    const [saveState, setSaveState] = useState({ UserId: '', FavCity: '' })
    const { favoriteCities, setFavoriteCities, handleFavoriteFetch } = props.cookieManager || [];

    
    // Destructer the items needed for saving user's favorites
    const { profileId, solidStar, regularStar, favorite, setFavorite } = props.favorite || [];
    
    // If it is a fresh search we will take the data passed as a prop, if the page is refreshed we will go to local storage to ensure the data persist on the page... I may end up moving some items to the indexedDB later on
    const current = JSON.parse(localStorage.getItem("weatherData")).current;
    const hourly = JSON.parse(localStorage.getItem("weatherData")).hourly;
    const city = JSON.parse(localStorage.getItem("currentCity"));
    
    // Separate our data so we only have city names
    const newList = []
    // Ensure the user is logged in
    if(profileId) {
        favoriteCities.forEach((item) => {
            newList.push(item.FavCity);
        });
    }

    // Run a check against the cookies/"favList" and determine whether the city is a favorite or not, we will also update or savedState according to our dependancies
    useEffect(() => {
        // We only want to run this if the user is logged in. We do this by checking if the profileId exist
        if (profileId) {
            setSaveState({
                UserId: profileId,
                FavCity: city,
            });

            if (newList.includes(city.trim())) {
                setFavorite(solidStar);
            } else {
                setFavorite(regularStar);
            }
        }
    }, [city, profileId]);



    // This is our handling function for when a user clicks the favorite "star" indicator
    const favoriteHandler = async () => {
        // If favList does not include the city name, execute the following
        if (!newList.includes(city)) {
            setFavorite(solidStar); // Update the star to solid
            // Make the fetch request
            const res = await fetch('/api/Favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saveState),
            });
            // Add measures to ensure the API call was executed properly
            if (res.ok) {
                handleFavoriteFetch();
                alert('City saved to favorites list');
            } else {
                alert('Sorry there was an error, try again later');
            }
            // otherwise do nothing
        } else {
            return;
        }
    };



    return (
        <div className="currentWrapper">
            <h1 className="display-3">
                <u>{city}</u>
                {/* If the user is logged in we will allow them to save a favorite city */}
                {profileId && (
                    <button className="btn neon mx-3" onClick={favoriteHandler}>
                        {favorite}
                    </button>
                )}
            </h1>
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