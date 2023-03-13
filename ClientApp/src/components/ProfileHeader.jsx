import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";

function ProfileHeader(props) {

  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value.toUpperCase());
    if (value.trim() === "") {
      setCitySuggestions([]);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    localStorage.setItem("currentCity", JSON.stringify(city));
    setCity("");
    setCitySuggestions([]);
    loadcities.profileCityStorage(props);
    props.onClick();
  };

  const handleSuggestionClick = (value) => {
    setCity(value.name);
    setCitySuggestions([]);
  };

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

  return (
    <div className="jumbotron jumbotron-fluid custom-border">
      <div className="container">
        <h1 className="display-4 font">Welcome {props.userName}</h1>
        <p className="lead font">To your personal weather dashboard</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <form
            className="d-flex flex-row"
            onSubmit={handleSearch}
          >
            <div className="d-flex flex-column position-relative">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    placeholder="Find a City"
                    id="profCity"
                    value={city}
                    className="p-1 m-1 bg-dark text-light"
                    onChange={handleCityChange}
                  ></input>
                </div>
                <div className="col-auto">
                  <button
                    type="submit"
                    className="m-1 bg-primary rounded custom-button"
                    id="search"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
              {citySuggestions.length > 0 && (
                <div className="suggestions-container">
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
          </form>
        </div>
        <button className="btn cust-btn mx-1" onClick={() => Auth.logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;