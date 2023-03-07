import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Profile() {

    const profileId = Auth.getProfile().userId;
    console.log(profileId);
    
    // We first will check to see if the user is logged in, if they are not we will direct them to the login page
    if (!Auth.loggedIn()) {
        document.location.replace("/login");
      }

    if(Auth.loggedIn() && profileId) {
        return (
            <div>
                <h1>hello world</h1>
            </div>
        )
    }


}

export default Profile;