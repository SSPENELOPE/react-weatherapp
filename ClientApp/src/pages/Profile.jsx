import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import fetchWeather from "../utils/fetchWeather";
import CityList from "../components/CityList";
import ProfileHeader from "../components/ProfileHeader";
import UserFavorties from "../components/UserFavorites";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CurrentWeather from "../components/CurrentWeather";
import FiveDay from "../components/FiveDay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons';
import Cookies from 'js-cookie';

function Profile() {
    // State to manage if we've loaded cookies
    const [cookiesLoaded, setCookiesLoaded] = useState(false);

    // Ensure we have the right userId and Name, pass the name as a prop
    const profileId = Auth.getProfile()?.userId;
    const userName = Auth.getProfile()?.unique_name;

    // This is how we will open and close the offCanvas
    const [show, setShow] = useState(false);

    /* This will check to see if we have a city name stored, if we dont set the state to empty string */
    const [city, setCity] = useState(() => {
        const currentCity = localStorage.getItem("currentCity");
        return currentCity ? JSON.parse(currentCity) : "";
    });

   /*  This will check to see if the stored weather data exist,
    if it does not we will set state equal to an empty string */
    const [weatherData, setWeatherData] = useState(() => {
        const storedData = localStorage.getItem('weatherData');
        return storedData ? JSON.parse(storedData) : "";
    });

    // Function to fetch the weather and store it, we will pass this as a prop
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

    // Function specifically for the previously viewed or favorites buttons to recall a city search
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

        // FontAwesome Icons and the state to manage it
        const solidStar = <FontAwesomeIcon icon={fasFaStar} size="2x"/>;
        const regularStar =  <FontAwesomeIcon icon={farFaStar} size="2x"/>;
        const [favorite, setFavorite] = useState(regularStar);

        // We will pass everything we need for the favorite indicator to the currentweather component in an object
        const favoriteItems = {
            solidStar,
            regularStar,
            favorite,
            setFavorite,
            profileId
        }
        
    
        const [favoriteCities, setFavoriteCities] = useState(() => {
            const favoritesCookies = Cookies.get('favoriteCities') || null;
          return  favoritesCookies ? JSON.parse(favoritesCookies) : [];
        });

        const handleFavoriteFetch = async () => {
         await fetch(`/api/Favorites/${profileId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                    // Creating an empty array to store the city names
                    const favList = [];
                    if(data === "No data") {
                        setCookiesLoaded(true);
                        return;
                    } else {
                        // Looping through the cities and adding them to the "favList" array
                        data.forEach((item) => {
                            favList.push(item);
                          });
                        // We are going to save it to localstorage so we dont have to keep checking our DB every page render
                        const cookieArray = JSON.stringify(favList);
                        Cookies.set('favoriteCities', cookieArray);
                        setFavoriteCities(favList) 
                        setCookiesLoaded(true);
                    }
            })
            .catch(error => {
                console.log(error + "No favorites to fetch")
            });
        } 

        const cookieManager = {
            favoriteCities,
            setFavoriteCities,
            handleFavoriteFetch
        }

        // Run a check against or database and determine if the user has favorited cities
        useEffect(() => {
            // We will again check here to ensure the user is logged in, extra security measure
            if (profileId) {
                handleFavoriteFetch();
            }
        }, []);

   


   
    // We first will check to see if the user is logged in, if they are NOT we will direct them to the login page
    if (!Auth.loggedIn()) {
        document.location.replace("/login");
    }

    // Show this while we wait for out useEffect to take place before rendering the next components
    if(!cookiesLoaded) {
        return (
            <div>Loading...</div>
        )
    } 

    // If we are logged in this is what we will display
    if (Auth.loggedIn() && profileId && cookiesLoaded) {
        return (
            <div>
                {/* Render the header */}
                <ProfileHeader
                 onClick={getWeather}
                 onClickButton={onClickButton}
                 userName={userName}
                />

                <div className="d-flex flex-column">

                    <div className="sideNav"> 
                        {/* This is how we open the offcanvas */}
                        <Button className="btn cust-btn m-2" onClick={() => setShow(true)}>
                            &#8592; More Options
                        </Button>
                        {/* This is the offcanvas with the user's saved information */}
                        <Offcanvas show={show} onHide={() => setShow(false)}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Make Your Changes</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="bg-dark">
                                <div>
                                    <UserFavorties
                                     onClickButton={onClickButton} 
                                     city={city} 
                                     favorite={favoriteItems}
                                     cookieManager={cookieManager} 
                                     />
                                    <CityList
                                     onClickButton={onClickButton}
                                      />
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>

                    <div>
                        {/* Here we will only render the information onto the page if it exist */}
                        {weatherData && <CurrentWeather data={weatherData} city={city} favorite={favoriteItems} cookieManager={cookieManager} />}
                        {weatherData && <FiveDay data={weatherData} city={city} />}
                    </div>

                </div>
            </div>
        )
    }


}

export default Profile;