import React from 'react';
import DataFetcher from '../DataFetcher';

const LatestDisccusions = () => {
    return (
        <div>
            <h1>Here's the latest disccusion made on the thread</h1>
            <p>Here is your info from MongoDB: </p>
            <DataFetcher/>

        </div>
    );
};

export default LatestDisccusions;
