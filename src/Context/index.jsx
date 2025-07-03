import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

// 1. Create and export context outside the component
export const StateContext = createContext();

// 2. Create and export Provider component
export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState('Coimbatore');
  const [thisLocation, setLocation] = useState('');

  // Fetch weather function
  const fetchWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: place,
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0,
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const res = await axios.request(options);
    
      const thisData = Object.values(res.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (e) {
      console.error(e);
      alert('Enter a Valid Place');
    }
  };

  // 3. useEffect to call API on place change
  useEffect(() => {
    fetchWeather();
  }, [place]);

  // 4. useEffect to log values when updated
 

  return (
    <StateContext.Provider value={{ weather, setPlace, values, thisLocation ,place}}>
      {children}
    </StateContext.Provider>
  );
};

// 5. Create and export custom hook for context
export const useStateContext = () => useContext(StateContext);
