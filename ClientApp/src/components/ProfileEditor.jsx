import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";


function ProfileEditor(props) {
    const profile = props.profile;
    const {editProfile, setEditProfile} = props.editor;

    
    /* EMAIL */
    const [email, setEmail] = useState({email: "", UserId: profile.userId});
    const [showEmail, setShowEmail] = useState(false);
    
    const handleEmailChange = (event) => {
        const {name, value} = event.target;
        setEmail({
            ...email,
            [name]: value,
        })    
    }

    const handleEmailSubmit = () => {

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
            setName("");
            setShowUsername(false);
            alert("Username was succesfully changed") 
        } else (
            alert(response.statusText = "Sorry try again later")
        );
    }

    /* PASSWORD */
    const [pw, setPw] = useState({password: "", UserId: profile.userId});
    const [showPw, setShowPw] = useState(false);

    const handlePwChange = (event) => {
        const {name,value} = event.target;
        setPw({
            ...email,
            [name]:value,
        });
    }

    const handlePwSubmit = () => {

    }

   

   
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
                                    value={email.email}
                                    ></input> 
                                    <div>
                                        {/* Submit button */}
                                        <button
                                        className="btn font"
                                        onClick={() => setShowEmail(false)}
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
                                            className="btn font"
                                            onClick={() => setShowPw(false)}
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
                    <button className="btn font" onClick={() => setEditProfile(false)}>Done</button>
                </div>

                

            </div>
        </div>
    )
}

export default ProfileEditor;