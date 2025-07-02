import React, { useState } from 'react';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import BackgroundLayout from './Components/BackgroundLayout';
import { MiniCard, WeatherCard } from './Components';

const App = () => {

  const [input, setInput] = useState(""); // search bar input state
  const { weather, thisLocation, setPlace, values ,place } = useStateContext(); // get data and setPlace from context
 const submitCity =()=>{
   setPlace(input);
   setInput(' ');
 }
  return (
    <div className='w-full h-screen text-white px-8'>

      {/* Navbar */}
      <nav className='w-full p-3 flex justify-between items-center '>
        <h1 className='font-bold tracking-wide sm:text-3xl text-black '>Weather App</h1>

        {/* Search bar */}
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
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
        </div>
      </nav>

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
