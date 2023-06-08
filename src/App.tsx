import React, { useState } from 'react';
import { MONTHS, DAYS } from './constants/constants';
const api = {
  key: "63b7ee299beeec17b7277ca1cd58d2f3",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const search = async evt => {
    if (evt.key === "Enter") {
      const res = await fetch(`${api.base}weather?q=${location}&units=metric&APPID=${api.key}`)
      const jsonRes = await res.json()
      setWeather(jsonRes);
      setLocation('');
      console.log(weather);
    }
  }

  const dateBuilder = (d) => {
    const day = DAYS[d.getDay()];
    const date = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setLocation
          (e.target.value)}
            value={location}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;