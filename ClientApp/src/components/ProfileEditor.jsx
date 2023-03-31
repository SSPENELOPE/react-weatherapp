import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Auth from "../utils/auth";


function ProfileEditor(props) {
    const profile = props.profile;
    const {editProfile, setEditProfile} = props.editor;

   
    /* Function to relog the user after the changes have been made */
    const relog = async (userData) => {
      
        const response = await fetch("/auth/Prelogged", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        if(response.ok) {
            const data = await response.json();
            Auth.login(data.Value.token);    
        } else {
            alert("Sorry we messed up, there was an erorr signing you back in")
            document.location.replace("/Login");
        };
    }
    // We will set the value of relogged back to false so the editor does not keep opening
    const setRelog = () => {
        localStorage.setItem("relogged", "false");
    }

    /* EMAIL */
    const [email, setEmail] = useState("");
    const [showEmail, setShowEmail] = useState(false);
    
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value)    
    }

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            UserId: profile.userId
        }

        const response = await fetch("/api/Edit/UpdateEmail", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
        })
        if(response.ok) {
            const userData = {
                email: email,
                UserId: profile.userId
            }
            setEmail("");
            setShowEmail(false);
            alert("Email was succesfully changed, make sure this is the one you use to log in next time");
            Auth.logout(false);
            await relog(userData);
            localStorage.setItem("relogged", "true");
        } else (
            alert(response.statusText = "Sorry try again later")
        );
         
    }


    /* USERNAME */
    const [name, setName] = useState("");
    const [showUsername, setShowUsername] = useState(false);
    
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }

    const handleUsernameSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: name,
            UserId: profile.userId
        }
    
        const response = await fetch("/api/Edit/UpdateUsername", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
        })
        if(response.ok) {
            const userData = {
                email: profile.email,
                UserId: profile.userId
            }
            setName("");
            setShowUsername(false);
            alert("Username was succesfully changed");
            Auth.logout(false);
            await relog(userData);
            localStorage.setItem("relogged", "true");
        } else (
            alert(response.statusText = "Sorry try again later")
        );
    };

    /* PASSWORD */
    const [pw, setPw] = useState({password: "", UserId: profile.userId});
    const [showPw, setShowPw] = useState(false);

    const handlePwChange = (event) => {
        const value = event.target.value;
        setPw(value);
    };

    const handlePwSubmit = async (event) => {
        event.preventDefault();
        const data = {
            password: pw,
            UserId: profile.userId
        };
        
        const response = await fetch("/api/Edit/UpdatePassword", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data),
        })
        if(response.ok) {
            const userData = {
                email: profile.email,
                UserId: profile.userId
            }
            setPw("");
            setShowPw(false);
            alert("Password was succesfully changed");
            Auth.logout(false);
            await relog(userData);
            localStorage.setItem("relogged", "true");
        } else (
            alert(response.statusText = "Sorry try again later")
        );
    };

   

   
    return (
        <div>
            <div className="editorWrapper fadeInDown">
                <div className="editorContent">
                    <h2 className="font"><u>Edit your profile</u></h2>
                    <div className="editBtns">

                        {/* Email edit */}
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4>Email: {profile.email}</h4>
                            <button
                                className="btn font"
                                onClick={() => {
                                    setShowEmail(true); 
                                    setShowUsername(false);
                                    setShowPw(false);
                                    }}
                            ><FontAwesomeIcon icon={faGear} />
                            </button>
                        </div>
                            { showEmail && (
                                <form className="d-flex flex-column align-items-center">
                                    <label className="font">Enter New Email</label>
                                    <input
                                    required
                                    type="email"
                                    onChange={handleEmailChange}
                                    value={email}
                                    ></input> 
                                    <div>
                                        {/* Submit button */}
                                        <button
                                        className="btn font"
                                        onClick={handleEmailSubmit}
                                            >Change Email
                                        </button>
                                        {/* Cancel button */}
                                        <button
                                        className="btn cancel"
                                        onClick={() => setShowEmail(false)}
                                            >Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                        {/* Username edit */}
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4 className="">Username: {profile.unique_name}</h4>
                            <button
                                className="btn font"
                                onClick={() => {
                                    setShowUsername(true);
                                    setShowEmail(false); 
                                    setShowPw(false);
                                    }}
                            ><FontAwesomeIcon icon={faGear} />
                            </button>
                        </div>
                            { showUsername && (
                                    <form className="d-flex flex-column align-items-center">
                                        <label className="font">Enter New Username</label>
                                        <input
                                        required
                                        type="name"
                                        onChange={handleUsernameChange}
                                        value={name}
                                        ></input> 
                                        <div>
                                            {/* Submit button */}
                                            <button
                                            className="btn font"
                                            onClick={handleUsernameSubmit}
                                                >Change Username
                                            </button>
                                            {/* Cancel button */}
                                            <button
                                            className="btn cancel"
                                            onClick={() => setShowUsername(false)}
                                                >Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                        {/* Password edit */}
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4 className="">Password: ********</h4>
                            <button
                                className="btn font"
                                onClick={() => {
                                    setShowPw(true);
                                    setShowUsername(false);
                                    setShowEmail(false); 
                                    }}
                            ><FontAwesomeIcon icon={faGear} />
                            </button>
                        </div>

                        { showPw && (
                                    <form className="d-flex flex-column align-items-center">
                                        <label className="font">Enter New Password</label>
                                        <input
                                        required
                                        type="name"
                                        onChange={handlePwChange}
                                        value={pw.pw}
                                        ></input> 
                                        <div>
                                            {/* Submit button */}
                                            <button
                                           
                                            onClick={handlePwSubmit}
                                                >Change Email
                                            </button>
                                            {/* Cancel button */}
                                            <button
                                            className="btn cancel"
                                            onClick={() => setShowPw(false)}
                                                >Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                    </div>
                    <button className="btn font" onClick={() => {setEditProfile(false); setRelog();}}>Done</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditor;