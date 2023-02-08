import React from 'react';
import videoBg from '../assets/images/videoBg.mp4';
import Header from '../components/Header';

function Home() {
    return (
        <div>
            <video class="video-1" src={videoBg} autoPlay loop muted />
            <Header />
            
        </div>
        )
}

export default Home;