import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";
const DEBOUNCE_DELAY = 300;



function Header(props) {
    const [city, setCity] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [btn, setBtn] = useState(false);

    // Call the function to load and display the saved cities when the component mounts
    useEffect(() => {
        loadcities.loadSavedCities(props)
    }, []);

    useEffect(() => {
        const storedCities = localStorage.getItem("savedCities") || [];
        if (storedCities.length > 0) {
            setBtn(true);
        } else {
            setBtn(false);
        }
    });

    /*      Due to long render times caused by scripting time on the live page, we will implement the useMemo hook to reduce the amount of times the filter is run to speed up the process. This could also be an issue due to my server itself.
    Its not like im paying for super expensive servers on azure      */
    // Memoize the fetchSuggestions function
    const fetchSuggestions = useMemo(() => async () => {
        console.log('Fetching suggestions...');
        const response = await fetch(`api/GetJson?search=${city}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        const data = await response.json();
        const filteredSuggestions = data.filter((suggestion) => suggestion.name.toUpperCase().startsWith(city.toUpperCase()));
        setCitySuggestions(filteredSuggestions);
    }, [city]);

    // Debounce the fetchSuggestions function
    useEffect(() => {
        let debounceTimer;
        if (city) {
            debounceTimer = setTimeout(() => {
                fetchSuggestions();
            }, DEBOUNCE_DELAY);
        }
        return () => clearTimeout(debounceTimer);
    }, [city, fetchSuggestions]);

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