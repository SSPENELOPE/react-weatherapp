import React from 'react';
import Header from '../components/Header';
import Auth from '../utils/auth';


function Home() {
const test = () => {
    const user = Auth.getProfile();
    console.log(user);
}
    return (
        <div>
            <Header />
            <button className='btn btn-primary' onClick={test}>Test Me</button>
        </div>
        )
}

export default Home;