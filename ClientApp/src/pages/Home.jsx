import React from 'react';
import Header from '../components/Header';
import Auth from '../utils/auth';
import fetchWeather from '../utils/fetchWeather';


function Home() {
const test = async () => {
    const response = await fetch(fetchWeather.GetWeather())
    if(response.ok) {
        const data = await response.json();
        console.log(data)
    } else {
        alert("Invalid Username or Password")
    };
}
    return (
        <div>
            <Header />
            <input id='blahblah' type="text"></input>
            <button className='btn btn-primary' onClick={test}>Test Me</button>
        </div>
        )
}

export default Home;