import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";
import loadSuggestions from "../utils/loadSuggestions"
const DEBOUNCE_DELAY = 300;



function Header(props) {
    const [city, setCity] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [btn, setBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimerRef = useRef(null);

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

    // Memoize the fetchSuggestions function
    const fetchSuggestions = useMemo(() => async () => {
        setIsLoading(true);
        console.log('Fetching suggestions...');
        const data = await loadSuggestions.getCachedCitySuggestions();
        const filteredSuggestions = data.filter((suggestion) => suggestion.name.toUpperCase().startsWith(city.toUpperCase()));
        setCitySuggestions(filteredSuggestions);
        setIsLoading(false);
    }, [city]);

  // Debounce the fetchSuggestions function, this helps for fast typers we will only render data once the user has paused typing in the input
  useEffect(() => {
    if (city) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions();
      }, DEBOUNCE_DELAY);
    }
    return () => clearTimeout(debounceTimerRef.current);
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