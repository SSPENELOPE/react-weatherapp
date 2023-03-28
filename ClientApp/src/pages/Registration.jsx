import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

function Registration() {
    const [formState, setFormState] = useState({ name: '', email: '', password: '' });
    const [data, setData] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        
            const data = {
                name: formState.name,
                email: formState.email,
                password: formState.password,
            }
            const response = await fetch("/auth/Registration", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if(response.ok) {
                const data = await response.json();
                Auth.login(data.Value.token);
            } else {
                alert("Invalid Username or Password")
            };

    };



    return (
        <div>

            {data ? (
                <p>
                    Success! You may now head{' '}
                    <Navigate to="/">back to the homepage.</Navigate>
                </p>
            ) : (
                <div className="regDiv mt-5">
                    <h1 className="text-light">Registration</h1>
                    <form className="regForm" onSubmit={handleFormSubmit}>
                        <label htmlFor="inputEmail4" className="align-self-start m-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            id="inputEmail4"
                        ></input>

                        <label htmlFor="inputName4" className="align-self-start m-2">Username</label>
                        <input
                            type="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            id="inputName4"
                        ></input>

                        <label htmlFor="inputPassword4" className="align-self-start m-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            id="inputPassword4"
                        ></input>
                        <button type="submit" className="btn regBtn p-2 m-2">Register</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Registration;