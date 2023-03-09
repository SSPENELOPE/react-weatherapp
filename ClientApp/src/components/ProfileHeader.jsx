import React, { useState } from "react";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";

function ProfileHeader(props) {
    const [city, setCity] = useState("");

    const handleCityChange = (event) => {
        setCity(event.target.value.toUpperCase());
    };

    const handleSearch = () => {
        localStorage.setItem("currentCity", JSON.stringify(city));
        setCity("");
        loadcities.profileCityStorage(props);
        props.onClick();
    };
    return (
        <div className="jumbotron jumbotron-fluid custom-border">
            <div className="container">
                <h1 className="display-4 font">Welcome {props.userName}</h1>
                <p className="lead font">To your personal weather dashboard</p>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <form onSubmit={ () => {props.onClick(); loadcities.profileCityStorage(props); handleSearch();} }>
                        <input
                            type="text"
                            placeholder="Find a City"
                            id="profCity"
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
                </div>
                <button className="btn cust-btn mx-1" onClick={() => Auth.logout()}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileHeader;