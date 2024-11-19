// src/DataFetcher.js
import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data from API...');  // Add this line for debugging
      try {
        //const response = await fetch('http://localhost:3000/getItems');
        const response = await fetch('http://ec2-18-116-98-51.us-east-2.compute.amazonaws.com:3000/getItems'); //mine

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        console.log("Fetched Data: ", jsonData); //check if data is fetched
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>From API server</h1>
      <h2> Fetched Data</h2>
      <ul>
        {data.map(item => (     //post =>   post._id
          <li key={item._id}>   
            <h2>User: {item.user}</h2>
            <p>comment: {item.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;