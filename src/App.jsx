import React, { useState } from 'react';
import search from './assets/icons/search.svg';
import location from './assets/icons/location.svg'; // location icon
import { useStateContext } from './Context';
import BackgroundLayout from './Components/BackgroundLayout';
import { MiniCard, WeatherCard } from './Components';

const App = () => {

  const [input, setInput] = useState(""); // search bar input state
  const [loading, setLoading] = useState(false); // loading state
  const { weather, thisLocation, setPlace, values } = useStateContext(); // get data and setPlace from context

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      alert("Fetching your current location...");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);

          try {
            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_GEOCODING_API_KEY}`);
            const data = await res.json();
            console.log(data); // see full response

            if (data && data.results && data.results.length > 0) {
              const components = data.results[0].components;
              const city = components.city || components.town || components.village || components.county || components.state;
              console.log("Detected city:", city);

              if (city) {
                alert(`Detected your location as: ${city}`);
                setPlace(city);
              } else {
                alert("Could not detect city. Try manually searching.");
              }
            } else {
              alert("No results found for your location.");
            }
          } catch (error) {
            console.log("Error fetching location from OpenCage", error);
            alert("Failed to fetch location data. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.log("Error getting user location", error);
          alert("Failed to get your device location. Please allow location permission.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>

      {/* Navbar */}
      <nav className='w-full p-3 flex justify-between items-center '>
        <h1 className='font-bold tracking-wide sm:text-3xl text-black '>Weather App</h1>

        {/* Search bar with location icon */}
        <div className='bg-white w-[18rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                submitCity(); // set place when Enter is pressed
              }
            }}
            type="text"
            className='focus:outline-none w-full text-black text-lg'
            value={input}
            placeholder='Search City'
            onChange={e => setInput(e.target.value)}
          />
          <img
            src={location}
            alt="location"
            className='w-[1.5rem] h-[1.5rem] cursor-pointer'
            onClick={fetchUserLocation}
            title="Use my location"
          />
        </div>
      </nav>

      {/* Loading indication */}
      {loading && (
        <div className="w-full text-center text-black font-semibold py-2">
          Fetching your location...
        </div>
      )}

      {/* Background */}
      <BackgroundLayout />

      {/* Main content */}
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>

        {/* Main Weather Card */}
        <WeatherCard
          temperature={weather.temp}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          place={thisLocation}
          thisLocation={weather.thisLocation}
          heatIndex={weather.heatIndex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map((curr) => (
              <MiniCard
                key={curr.datetime}
                time={curr.datetime}
                temp={curr.temp}
                iconString={curr.conditions}
              />
            ))
          }
        </div>

      </main>

    </div>
  );
}

export default App;
