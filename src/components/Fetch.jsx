import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';

  useEffect(() => {
    if (city !== '') {
      fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
      `);

      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div className='container'>
      <div className='coco row'>
        <div className="col-lg-1"></div>
<div className='c col-lg-10'>
          <h1>Weather App</h1>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button className='ms-3 text-white' onClick={fetchWeatherData}>Get Weather</button>
    

      {weatherData && (
        <div>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
      </div>  
<div className="col-lg-1"></div>
    </div>
    </div>
  );
};

export default WeatherApp