import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";



function Header(props) {
   
      // Call the function to load and display the saved cities when the component mounts
      useEffect(() => {
        loadcities.loadSavedCities(props)
      }, []);

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
                document.location.replace("/Profile")
            ) : (
            // if we are NOT logged in
                <div>
                    <h1 className="text-light font">Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light" onChange={props.onChange}></input>
                                <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={() => {props.onClick(); loadcities.handleCityStorage(props); showBtn();}}>Search</button>
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