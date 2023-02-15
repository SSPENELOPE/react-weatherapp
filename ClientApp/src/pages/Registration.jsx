import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Registration() {
    const [formState, setFormState] = useState({ email: '', password: ''});
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
        try{
            const data =  {
                email: formState.email,
                password: formState.password,
            }
            const url = "api/Registration";
            await axios.post(url,data).then((res) =>{
            if(res.status == 200) {
                console.log(res);
                setData(true);
                alert("sweet, its been done")
            } else {
                console.log(res);
                alert("ERROR MY DUDE")
            }
            }).catch((error) => {
                alert(error)
            })
            
            setFormState({
                email: '',
                password: '',
            });

        } catch (e) {
            console.error(e)
        }
    
    };



    return (
        <div>

            {data ? (
                    <p>
                    Success! You may now head{' '}
                    <Navigate to="/">back to the homepage.</Navigate>
                </p>
            ) : (
            <div>
                <h1>Registration</h1>
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="inputEmail4">Email</label>
                        <input 
                        type="email" 
                        name="email"
                        value={formState.email} 
                        onChange={handleChange} 
                        id="inputEmail4"
                        ></input>
                    <label htmlFor="inputPassword4">Password</label>
                        <input 
                        type="password"
                        name="password" 
                        value={formState.password} 
                        onChange={handleChange}
                        id="inputPassword4" 
                        ></input>
                    <button type="submit" className="btn btn-primary">Register</button> 
                </form>
            </div>
            )}
        </div>
    )
}

export default Registration;