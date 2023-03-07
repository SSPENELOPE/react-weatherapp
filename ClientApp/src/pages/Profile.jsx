import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import ProfileHeader from "../components/ProfileHeader";

function Profile() {

    const profileId = Auth.getProfile().userId;
    console.log(profileId);
    const userName = Auth.getProfile().unique_name;
    console.log(userName);
    
    // We first will check to see if the user is logged in, if they are not we will direct them to the login page
    if (!Auth.loggedIn()) {
        document.location.replace("/login");
      }

    if(Auth.loggedIn() && profileId) {
        return (
            <div>
                <ProfileHeader userName={userName} />
                <h1>hello world</h1>
            </div>
        )
    }


}

export default Profile;