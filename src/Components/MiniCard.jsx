import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import windy from '../assets/icons/windy.png'
import '../index.css'

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcons] = useState(null)

  useEffect(() => {
    if (iconString) {
      let str = iconString.toLowerCase()
      if (str.includes('cloud')) setIcons(cloud)
      else if (str.includes('fog')) setIcons(fog)
      else if (str.includes('rain')) setIcons(rain)
      else if (str.includes('snow')) setIcons(snow)
      else if (str.includes('storm') || str.includes('thunder')) setIcons(storm)
      else if (str.includes('windy')) setIcons(windy)
      else if (str.includes('clear')) setIcons(sun)
      else setIcons(sun) // fallback icon
    } else {
      setIcons(sun) // fallback when iconString is undefined
    }
  }, [iconString])

  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        {new Date(time).toLocaleDateString('en', { weekday: 'long' })}
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        {icon && (
          <img src={icon} alt="weather-icon" className='w-[4rem] h-[4rem]' />
        )}
      </div>
      <p className='text-center font-bold'>
        {temp} &deg;C
      </p>
    </div>
  )
}

export default MiniCard
