import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import fetchWeather from "../utils/fetchWeather";
import ProfileHeader from "../components/ProfileHeader";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Profile() {
    // Ensure we have the right userId and Name, pass the name as a prop
    const profileId = Auth.getProfile().userId;
    const userName = Auth.getProfile().unique_name;

    // The offcanvas list of the users saved cities
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* This will check to see if we have a city name stored, if we dont set the state to empty string */
    const [city, setCity] = useState(() => {
        const currentCity = localStorage.getItem("currentCity");
        return currentCity ? JSON.parse(currentCity) : "";
    })

    // Same setWeatherData to verify we have weather data
    const [weatherData, setWeatherData] = useState(() => {
        const storedData = localStorage.getItem('weatherData');
        return storedData ? JSON.parse(storedData) : "";
    });
    // Fetchweather funtion, we will pass this as a prop
    const getWeather = async () => {
        try {
            const response = await fetchWeather.getWeather();
            setWeatherData(response);
            localStorage.setItem('weatherData', JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
    };

    const onClickButton = async (city) => {
        try {
            const response = await fetchWeather.getWeatherButton(city);
            setWeatherData(response);
            setCity(city);
            localStorage.setItem('weatherData', JSON.stringify(response));
            localStorage.setItem('currentCity', JSON.stringify(city));
        } catch (error) {
            console.log(error);
        }
    };

    const handleCityChange = (event) => {
        let city = event.target.value.trim().toUpperCase();
        localStorage.setItem("currentCity", JSON.stringify(city))
    };

    // We first will check to see if the user is logged in, if they are not we will direct them to the login page
    if (!Auth.loggedIn()) {
        <h1>You need to be logged in to see this</h1>
    }

    // If we are logged in this is what we will display
    if (Auth.loggedIn() && profileId) {
        return (
            <div>
                {/* Render the header  */}
                <ProfileHeader onClick={getWeather} userName={userName} />

                <div className="d-flex flex-row">
                    <div className="sideNav">
                        <Button variant="primary m-2" onClick={handleShow}>
                            Change your city
                        </Button>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div>
                                    <h2>Hello World</h2>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>

            </div>
        )
    }


}

export default Profile;