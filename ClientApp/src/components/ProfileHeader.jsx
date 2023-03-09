import React, { useEffect } from "react";
import Auth from "../utils/auth";
import loadcities from "../utils/loadcities";

function ProfileHeader(props) {
    
    return (
        <div className="jumbotron jumbotron-fluid custom-border">
            <div className="container">
                <h1 className="display-4 font">Welcome {props.userName}</h1>
                <p className="lead font">To your personal weather dashboard</p>
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <input type="text" placeholder="Find a City" id="profCity" className="p-1 m-1 bg-dark text-light" onChange={props.onChange}></input>
                    <button type="submit" className="m-1 bg-primary rounded custom-button" id="search" onClick={() => {props.onClick(); loadcities.profileCityStorage(props);}}>Search</button>
                </div>
                <button className="btn cust-btn mx-1" onClick={() => Auth.logout()}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileHeader;