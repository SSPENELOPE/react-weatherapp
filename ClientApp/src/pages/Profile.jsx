import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import ProfileHeader from "../components/ProfileHeader";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Profile() {

    const profileId = Auth.getProfile().userId;
    const userName = Auth.getProfile().unique_name;

    // The offcanvas list of the users saved cities
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // We first will check to see if the user is logged in, if they are not we will direct them to the login page
    if (!Auth.loggedIn()) {
        document.location.replace("/login");
    }

    // If we are logged in this is what we will display
    if (Auth.loggedIn() && profileId) {
        return (
            <div>
                {/* Render the header  */}
                <ProfileHeader userName={userName} />
                <div className="d-flex flex-row">
                    {/* Render the sidenav bar with the users favorited cities */}
                    <div className="sideNav">


                        <Button variant="primary m-2" onClick={handleShow}>
                            Change your city
                        </Button>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                              <div>
                                <h2>Hello World</h2>
                              </div>
                            </Offcanvas.Body>
                        </Offcanvas>


                    </div>
                </div>

            </div>
        )
    }


}

export default Profile;