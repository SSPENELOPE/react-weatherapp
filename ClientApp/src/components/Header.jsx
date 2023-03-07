import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";



function Header(props) {
   
    // Define a function that loads the saved cities from local storage and displays them
    const loadSavedCities = () => {
        // React likes to render things twice, so we can check here to see if its already been rendered, if it has, exit the function so we dont render it twice!
        let cityList = document.getElementById("city-list");
        if (cityList.children.length > 0) return; // return early if cities already loaded

        // Else check storage and add the items
        let storageArray = JSON.parse(localStorage.getItem('savedCities')) || [];
        storageArray.forEach((cityNames) => {
          var cityList = document.getElementById("city-list");
          var cities = document.createElement("button");
          cities.classList = "bg-transparent text-center cities m-3";
          cities.textContent = cityNames;
          cities.addEventListener("click", () => props.onClickButton(cityNames));
          cityList.appendChild(cities);
        });
      };
    
      // Call the function to load and display the saved cities when the component mounts
      useEffect(() => {
        loadSavedCities();
      }, []);


      // Here we define the function that is going to create and store the buttons
      const handleCityStorage = () => {
        const cityInput = document.getElementById("city");
        const city = cityInput.value.trim().toUpperCase();
        let storageArray = JSON.parse(localStorage.getItem('savedCities')) || [];
        const cityList = document.getElementById("city-list");
        
        // Check if city already exists in storageArray
        const cityExists = storageArray.includes(city);
      
        const cities = document.createElement("button");
        cities.classList = "bg-transparent text-center cities m-3";
        cities.textContent = city;
        cities.addEventListener("click", props.onClickButton(city));
      
        // If city doesn't exist in storageArray, append it to the list and add it to the storageArray
        if(!cityExists) {
          cityList.appendChild(cities);
          storageArray.push(city);
          localStorage.setItem("savedCities", JSON.stringify(storageArray));
        }
      }
    
    // Set the button state
    const [btn, setBtn] = useState(false);

    // Hide and show the clear button
    const showBtn = () => {
        setBtn(true)
    }

    // Later we will add content to clear the cities list 
    const hideBtn = () => {
        setBtn(false);
    }
    

    return (
       // if we ARE logged in 
        <header className="custom-header text-center p-3">
            {Auth.loggedIn() ? (
                <div>
                    <h1 className="text-light font">{Auth.getProfile().unique_name}'s Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light" onChange={props.onChange}></input>
                                <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={() => {props.onClick(); handleCityStorage(); showBtn();}}>Search</button>
                            </div>
                            <div>
                                <Link to={"/profile"} className="btn cust-btn mx-1">Profile</Link>
                                <button className="btn cust-btn mx-1" onClick={() => Auth.logout()}>Logout</button>
                            </div>
                        </div>
                        <div className="row align-items-center justify-content-between">
                            <div className="row listDiv">
                                <h3 className="my-2 d-flex">Previously Viewed:</h3>
                                <ul className="cities-list mx-3" id="city-list"></ul>
                            </div>
                            {btn ? (
                                <div>
                                    <button id="clear-button" onClick={hideBtn}>Clear Previously Viewed</button>
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </section>
                </div>

            ) : (
            // if we are NOT logged in
                <div>
                    <h1 className="text-light font">Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light" onChange={props.onChange}></input>
                                <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={() => {props.onClick(); handleCityStorage(); showBtn();}}>Search</button>
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
                                    <button id="clear-button" onClick={hideBtn}>Clear Previously Viewed</button>
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