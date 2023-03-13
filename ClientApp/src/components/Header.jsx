import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";



function Header(props) {
    const [city, setCity] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [btn, setBtn] = useState(false);

    // Call the function to load and display the saved cities when the component mounts
    useEffect(() => {
        loadcities.loadSavedCities(props)
    }, []);

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value.toUpperCase());
        if (value.trim() === "") {
          setCitySuggestions([]);
        }
      };

    const handleSuggestionClick = (value) => {
        setCity(value.name);
        setCitySuggestions([]);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        localStorage.setItem("currentCity", JSON.stringify(city));
        setCity("");
        setCitySuggestions([]);
        props.onClick();
      };

    useEffect(() => {
        const storedCities = localStorage.getItem("savedCities") || [];
        if(storedCities.length > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }
    })

    // When there is a changet to the "city" state we will initiate a search of the city json file to filter through and provide suggestions to the user, being that open weather map is specific about the city names
    useEffect(() => {
        const fetchSuggestions = async () => {
            console.log('Fetching suggestions...');
            await fetch("api/GetJson", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const filteredSuggestions = data.filter((suggestion) => {
                        if (suggestion.hasOwnProperty('name') && city !== '') {
                            return suggestion.name.toUpperCase().includes(city.toUpperCase());
                        }
                        return false;
                    });
                    setCitySuggestions(filteredSuggestions);
                })
                .catch(error => console.error(error));
        };

        if (city) {
            fetchSuggestions();
        }
    }, [city]);

    // clear the previously viewed bar
    const clear = () => {
        localStorage.removeItem("savedCities");
        document.location.reload();
        setBtn(false);
    }

    return (
        // if we ARE logged in 
        <header className="custom-header text-center p-3">
            {Auth.loggedIn() ? (
                document.location.replace("/Profile")
            ) : (
                // if we are NOT logged in
                <div>
                    <h1 className="text-light font">Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-column">
                                <form onSubmit={handleSearch}>
                                    <input
                                     type="text" 
                                     placeholder="Find a City" 
                                     id="city" 
                                     value={city}
                                     className="p-1 m-1 bg-dark text-light" 
                                     onChange={handleCityChange}
                                     ></input>
                                    <button 
                                    type="submit" 
                                    className="m-1 bg-primary rounded custom-button" 
                                    id="search"
                                    >Search</button>
                                </form>
                                <div>
                                    {citySuggestions.length > 0 && (
                                    <div className="suggestions-container-notLogged">
                                        <ul className="suggestions">
                                            {citySuggestions.map((suggestion, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    {suggestion.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    )}
                                </div>
                            </div>
                    
                            <div>
                                <Link to="/login" className="btn cust-btn">Login</Link>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-between">
                            <div className="row listDiv">
                                <h3 className="my-2 d-flex">Previously Viewed:</h3>
                                <ul className="cities-list mx-3" id="city-list"></ul>
                            </div>
                            {btn ? (
                                <div>
                                    <button id="clear-button" onClick={clear}>Clear Previously Viewed</button>
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </section>
                </div>
            )}

        </header>
    )
}

export default Header;