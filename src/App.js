import React, { useState } from "react";

const App=()=>{
   let api={
    key:"4371c2af87c47e5cb9890b006c522853",
    url:"https://api.openweathermap.org/data/2.5/weather"
   };
   let [search,setSearch]= useState("");
   let [weather, setWeather] = useState(null);
   const [loading, setLoad] = useState(false);
   let [error,setError] = useState(null);

   function weatherSearch() {
    setLoad(true); 
    setError(null);
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then(res => {
        if (!res.ok) {
          throw new Error("City not found"); // Check for response status
        }
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setError(null);
      })
      .catch(error => {
        console.error("Failed to fetch weather data:", error);
        setError("City not Found")
        setWeather(null); 
      })
      .finally(() => {
        setLoad(false); 
        setSearch(""); 
      });
  }

   function enterkey(event) {
    if (event.key === "Enter") {
      weatherSearch()
    
    }
  }
   console.log(weather);
   
   return(
    <div id="container">
      <h1>Weather Here</h1>
      <section>
      <span id="block">
        <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="Enter city name" 
            onKeyDown={enterkey}  />

         <button onClick={weatherSearch} >Search</button>
        </span>
      </section>
         {loading ? (
        <p>Loading...</p>
      ) :error?(<p>{error}</p>): weather ? (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} </p> {/* Convert to °C */}
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ):<p></p>
      }
    </div>
   )
}
export default App;