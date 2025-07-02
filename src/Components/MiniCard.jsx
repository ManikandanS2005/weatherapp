import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import windy from '../assets/icons/windy.png'
import '../index.css'
import '../index.css'

const MiniCard = ({time,temp,iconString}) => {
  const[icon,setIcons]=useState('')
  
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
        }}
  },[iconString])
  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        {
          new Date(time).toLocaleDateString('en',{weekday:'long'}).split(" ")[0]
        }
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
         <img src={icon} alt="weather-icon" className='w-[4rem] h-[4rem]' />
      </div>
       <p className='text-center font-bold'>
        {temp} &deg;C
       </p>
 
      
    </div>
  )
}

export default MiniCard
