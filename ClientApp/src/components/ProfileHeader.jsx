import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function ProfileHeader(props) {
    return (
        <div className="jumbotron jumbotron-fluid custom-border">
            <div className="container">
                <h1 className="display-4 font">Welcome {props.userName}</h1>
                <p className="lead font">To your personal weather dashboard</p>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="/" className="btn cust-btn mx-1">Home</Link>
                <button className="btn cust-btn mx-1" onClick={() => Auth.logout()}>Logout</button>
            </div>
        </div>
    )
}

export default ProfileHeader;