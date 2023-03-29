import React, { useState, useEffect }from "react";
import HourlyWeather from "./HourlyWeather";


function CurrentWeather(props) {
    // Set the state of the form we will send if the user saves a city
    const [saveState, setSaveState] = useState({UserId: '', FavCity: ''})

    // Destructer the items needed for saving user's favorites
    const {profileId, solidStar, regularStar, favorite, setFavorite} = props.favorite || "";
    
    // If it is a fresh search we will take the data passed as a prop, if the page is refreshed we will go to local storage to ensure the data persist on the page... I may end up moving some items to the indexedDB later on
    const current = props.data.current || JSON.parse(localStorage.getItem("weatherData")).current;
    const hourly = props.data.hourly || JSON.parse(localStorage.getItem("weatherData")).hourly;
    const city = JSON.parse(localStorage.getItem("currentCity"));
    const favList = JSON.parse(localStorage.getItem("favList"));
    
    // Run a check against the local storage and determine whether the city is a favorite or not
    useEffect(() => {
        // Only run this useEffect if the user is logged in
        if(props.profileId) {
            console.log("favList:", favList);
            console.log("city:", city);
            setSaveState({
                UserId: profileId,
                FavCity: city
            })
            console.log(saveState)
            if (favList.includes(city.trim())) {
                console.log("city is in favList");
                setFavorite(solidStar);
            } else {
                console.log("city is not in favList");
                setFavorite(regularStar);
            }
        }
    }, [city] || []);

    const favoriteHandler = async () => {
        setFavorite(solidStar);
        favList.push(city);
       
        console.log(saveState)
        const res = await fetch("/api/Favorites", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveState)
        })
        if (res.ok) {
            alert("City saved to favorites list")
        } else {
            alert("Sorry there was an error, try again later")
        }
    }
    
    return (
        <div className="currentWrapper">
            
            <h1 className="display-3">
                <u>{city}</u>
                {/* If the user is logged in we will allow them to save a favorite city */}
                {props.profileId && (
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