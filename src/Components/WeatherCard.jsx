import React, { useEffect, useState } from 'react'
import {useDate} from '../utils/utils'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import windy from '../assets/icons/windy.png'
import '../index.css'
const WeatherCard = (
  {
    temperature,
    windspeed,
    humidity,
    place,
    thisLocation,
    heatIndex,
    iconString,
    conditions,
  }
) => {
  const [icon,setIcons]=useState(sun)
  const {time}=useDate()

  useEffect(()=>{
   if(iconString){
    if(iconString.toLowerCase().includes('cloud')){
      setIcons(cloud)
    }
     else if(iconString.toLowerCase().includes('fog')){
      setIcons(fog)
    }
     else if(iconString.toLowerCase().includes('rain')){
      setIcons(rain)
    }
     else if(iconString.toLowerCase().includes('snow')){
      setIcons(snow)
    }
     else if(iconString.toLowerCase().includes('storm') ||iconString.toLowerCase().includes('thunder')){
      setIcons(storm)
    }
     else if(iconString.toLowerCase().includes('windy')){
      setIcons(windy)
    }
     else if(iconString.toLowerCase().includes('clear')){
      setIcons(sun)
    }
    
   }

  },[iconString])
  return (
    <div className='w-[22rem] min-w-[22rem] h-[35rem] glassCard p-4' >
      
      <div className='flex w-full justify-center items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather-icon"  />
        <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-5xl'>
        {thisLocation || place}

      </div>
      <div className='w-full flex justify-between items-center mt-4'> <p className='flex-1 text-center p-2'>
        {new Date().toDateString()}
      </p>
      <p className='flex-1 text-center p-2'>
        {time}
      </p>

      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
            <p className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-xl'>Wind Speed <span className='font-normal'>{windspeed}</span></p>
             <p className='flex-1 text-center p-2 font-bold bg-green-600 shadow rounded-lg'>Humidity<span className='font-normal'>{humidity}</span></p>
      </div>
     <div className='w-full p-3 mt-4'>
  <div className='flex justify-between items-center'>
    <p className='font-semibold text-lg'>
      Heat Index:
    </p>
    <p className='text-lg'>
      {heatIndex ? heatIndex : 'N/A'}
    </p>
  </div>

  <hr className='bg-slate-600 my-2' />

  <div className='w-full p-4 pt-1 flex justify-center items-center text-lg font-semibold'>
    {conditions}
  </div>
</div>

    </div>
  )
}

export default WeatherCard
