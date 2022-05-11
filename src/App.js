import React, { useState } from 'react';

const weather_api = {
    key : "82736524bda615f358b15f9c9e2beb9b",
    baseURL : "https://api.openweathermap.org/data/2.5/weather";
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${weather_api.baseURL}?q=${query}&units=metrics&appid=${weather_api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

    // this is how you look through an index in an array
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    // return in a template string
    return `${day} ${date} ${month} ${year}`
  }

  return (
    // checking for the type of weather 
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp > 290) 
    ? 'app warm' 
      : 'app') 
    : 'app' }>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
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
              {Math.round((Math.round(weather.main.temp)-273.15)*(9/5)+32)}°F
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
