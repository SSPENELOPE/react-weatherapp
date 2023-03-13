import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import fetchWeather from "../utils/fetchWeather";
import CityList from "../components/CityList";
import ProfileHeader from "../components/ProfileHeader";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CurrentWeather from "../components/CurrentWeather";
import FiveDay from "../components/FiveDay";


function Profile() {

    // Ensure we have the right userId and Name, pass the name as a prop
    const profileId = Auth.getProfile()?.userId;
    const userName = Auth.getProfile()?.unique_name;

    // The offcanvas list of the users saved cities
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* This will check to see if we have a city name stored, if we dont set the state to empty string */
    const [city, setCity] = useState(() => {
        const currentCity = localStorage.getItem("currentCity");
        return currentCity ? JSON.parse(currentCity) : "";
    });

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
            setCity(city);
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
            if(show) {
                setShow(false)
            }
        } catch (error) {
            console.log(error);
        }
    };


    // We first will check to see if the user is logged in, if they are not we will direct them to the login page
    if (!Auth.loggedIn()) {
        document.location.replace("/login");
    }
    // If we are logged in this is what we will display
    if (Auth.loggedIn() && profileId) {
        return (
            <div>
                {/* Render the header  */}
                <ProfileHeader
                 onClick={getWeather}
                 onClickButton={onClickButton}
                 userName={userName}
                />

                <div className="d-flex flex-column">
                    <div className="sideNav">
                        <Button className="btn cust-btn m-2" onClick={handleShow}>
                            &#8592; More Options
                        </Button>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Make Your Changes</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="bg-dark">
                                <div>
                                    <CityList onClickButton={onClickButton} />
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div>

                        {weatherData && <CurrentWeather data={weatherData} city={city} />}

                        {weatherData && <FiveDay data={weatherData} city={city} />}

                    </div>
                </div>
            </div>
        )
    }


}

export default Profile;