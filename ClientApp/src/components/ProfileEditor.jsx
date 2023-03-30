import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";


function ProfileEditor() {
    const [pw, setPw] = useState({password: ""});
    const [showPw, setShowPw] = useState(false);

    const [username, setUsername] = useState({username: ""});
    const [showUsername, setShowUsername] = useState(false);

    const [email, setEmail] = useState({email: ""});
    const [showEmail, setShowEmail] = useState(false);

    const handlePwChange = (event) => {
        const {name, value} = event.target;
        
    }

    const handlePwSubmit = () => {

    }

    const handleUsernameSubmit = () => {

    }

    const handleEmailSubmit = () => {

    }

    return (
        <div>
            <div className="editorWrapper fadeInDown">
                <div className="editorContent">
                    <h2 className="font"><u>Edit your profile</u></h2>
                    <div className="editBtns">
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4>Email</h4>
                            <button className="btn font" onClick={() => setShowEmail(true)}><FontAwesomeIcon icon={faGear} /></button>
                        </div>
                            { showEmail && (
                                <form className="d-flex flex-column align-items-center">
                                    <label className="font">Enter New Email</label>
                                    <input
                                    type="email"
                                    value={email.value}
                                    ></input> 
                                    <div>
                                        <button
                                        className="btn font"
                                        onClick={() => setShowEmail(false)}
                                            >Change Email
                                        </button>

                                        <button
                                        className="btn cancel"
                                        onClick={() => setShowEmail(false)}
                                            >Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4 className="">Username</h4>
                            <button className="btn font"><FontAwesomeIcon icon={faGear} /></button>
                        </div>
                        <div className="d-flex flex-row font w-100 justify-content-around">
                            <h4 className="">Password</h4>
                            <button className="btn font"><FontAwesomeIcon icon={faGear} /></button>
                        </div>
                    </div>
                </div>

                

            </div>
        </div>
    )
}

export default ProfileEditor;