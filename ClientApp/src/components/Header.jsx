import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";



function Header() {
    // Set the button state
    const [btn, setBtn] = useState(false);

    // Hide and show the clear button
    const showBtn = () => {
        setBtn(true)
    }
    const hideBtn = () => {
        setBtn(false);
    }

    // Will fix this later to update the page based on the element having a list or not
    // *TODO* is reading null for .hasChildNodes method
    /*     const checkIfCities = () => {
            while(!cityList.hasChildNodes) {
                setBtn(false)
            }
        }
        checkIfCities(); */


    return (
        <header className="custom-header text-center p-3">
            {Auth.loggedIn() ? (
                <div>
                    <h1 className="text-light font">{Auth.getProfile().unique_name}'s Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light"></input>
                                <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={showBtn}>Search</button>
                            </div>
                            <div>
                            <button className="btn cust-btn" onClick={() => Auth.logout()}>Logout</button>
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
                <div>
                    <h1 className="text-light font">Weather Dashboard</h1>
                    <section className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between">
                            <div>
                                <input type="text" placeholder="Find a City" id="city" className="p-1 m-1 bg-dark text-light"></input>
                                <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={showBtn}>Search</button>
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