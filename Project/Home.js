//Goes in Pages
import React from 'react';
import logo from '../assets/logo.png'; // Adjust the path as needed

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to Vapour Discussions, a discussion board for all your favorite games! ;) </p>
            <img src={logo} alt="Vapour Logo" style={{ width: '600px', height: 'auto' }} />
            <p>Simply click on the Discussions page to start your discussion!</p>
        </div>
    );
};

export default Home;
