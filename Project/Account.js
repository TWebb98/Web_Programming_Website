//goes in Pages
import React from 'react';
import DataFetcher from '../DataFetcher';

const Account = () => {
    return (
        <div>
            <h1>Login into your Account here</h1>
            <p>Here is your info from MongoDB: </p>
            <DataFetcher/>

        </div>
    );
};

export default Account;
