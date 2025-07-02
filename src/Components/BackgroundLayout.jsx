import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context'
import Clear from '../assets/images/Clear.jpg'
import Fog from '../assets/images/Fog.png'
import Cloudy from '../assets/images/Cloudy.jpg'
import Rainy from '../assets/images/Rainy.jpg'
import Snow from '../assets/images/Snow.jpg'
import Stromy from '../assets/images/Stormy.jpg'
import Sunny from '../assets/images/Sunny.jpg'

const BackgroundLayout = () => {
  const {weather}=useStateContext()
  const[image,setImage]= useState(Clear)

  useEffect(()=>{
    if(weather.conditions){
      let imageString =weather.conditions
      if(imageString.toLowerCase().includes('clear')){
        setImage(Clear)
      }
      if(imageString.toLowerCase().includes('fog')){
        setImage(Fog)
      }
      else if(imageString.toLowerCase().includes('cloudy')){
        setImage(Cloudy)
      }
      else if(imageString.toLowerCase().includes('rainy')||imageString.toLowerCase().includes('shower')){
        setImage(Rainy)
      }
      else if(imageString.toLowerCase().includes('snow')){
        setImage(Snow)
      }
      else if(imageString.toLowerCase().includes('thunder')||imageString.toLowerCase().includes('strom')){
        setImage(Stromy)
      }
      else if(imageString.toLowerCase().includes('sunny')){
        setImage(Sunny)
      }
    }
  },[weather])
  return (
    <div>
      <img src={image} alt="weather_img"  className='h-screen w-full fixed left-0 top-0 -z-[10]'/>
    </div>
  )
}

export default BackgroundLayout
