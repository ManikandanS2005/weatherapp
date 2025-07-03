import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context'
import Clear from '../assets/images/Clear.jpg'
import Fog from '../assets/images/fog.png'
import Cloudy from '../assets/images/Cloudy.jpg'
import Rainy from '../assets/images/Rainy.jpg'
import Snow from '../assets/images/snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'

const BackgroundLayout = () => {
  const { weather } = useStateContext()
  const [image, setImage] = useState(Clear)

  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions.toLowerCase()
      

      // 🔥 Priority combination conditions
      if (imageString.includes('rain') && imageString.includes('overcast')) {
        setImage(Rainy) // Rain + Overcast → Rainy bg
      } else if (imageString.includes('snow') && imageString.includes('storm')) {
        setImage(Stormy) // Snow storm → Stormy bg
      } else if (imageString.includes('rain') && imageString.includes('storm')) {
        setImage(Stormy) // Thunderstorm rain → Stormy bg
      } else if (imageString.includes('fog') && imageString.includes('rain')) {
        setImage(Fog) // Fog + Rain → Fog bg (no separate bg available)
      } else if (imageString.includes('fog') && imageString.includes('snow')) {
        setImage(Fog) // Fog + Snow → Fog bg (snow fog effect)
      } else if (imageString.includes('snow') && imageString.includes('rain')) {
        setImage(Rainy) // Rain + Snow → Rainy bg (since rain dominates)
      } else if (imageString.includes('fog') && imageString.includes('storm')) {
        setImage(Stormy) // Fog + Storm → Stormy bg
      } else if (imageString.includes('snow') && imageString.includes('overcast')) {
        setImage(Snow) // Snow + Overcast → Snow bg
      } else if (imageString.includes('fog') && imageString.includes('cloud')) {
        setImage(Fog) // Fog + Cloud → Fog bg

      // 🔥 Individual severe conditions
      } else if (
        imageString.includes('storm') || 
        imageString.includes('thunder') || 
        imageString.includes('thunderstorm')
      ) {
        setImage(Stormy)
      } else if (
        imageString.includes('snow') || 
        imageString.includes('snowfall')
      ) {
        setImage(Snow)
      } else if (
        imageString.includes('rain') || 
        imageString.includes('shower') || 
        imageString.includes('drizzle') || 
        imageString.includes('rainchance') || 
        imageString.includes('rainam') || 
        imageString.includes('rainpm')
      ) {
        setImage(Rainy)
      } else if (
        imageString.includes('fog') || 
        imageString.includes('mist') || 
        imageString.includes('haze')
      ) {
        setImage(Fog)
      } else if (
        imageString.includes('cloud') || 
        imageString.includes('overcast') || 
        imageString.includes('partially cloudy') || 
        imageString.includes('variablecloud')
      ) {
        setImage(Cloudy)
      } else if (
        imageString.includes('clear') || 
        imageString.includes('sunshine') || 
        imageString.includes('sunny')
      ) {
        setImage(Clear)
      } else {
        setImage(Clear) // fallback
      }
    } else {
      setImage(Clear) // when no conditions available
    }
  }, [weather])

  return (
    <div>
      {image && (
        <img
          src={image}
          alt="weather_img"
          className="h-screen w-full fixed left-0 top-0 -z-[10]"
        />
      )}
    </div>
  )
}

export default BackgroundLayout
