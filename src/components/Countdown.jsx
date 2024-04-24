import React, { useEffect, useState } from 'react'
const { differenceInSeconds, startOfTomorrow } = require("date-fns")

export default function Countdown() {

  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [seconds, setSeconds] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const result = differenceInSeconds(
        startOfTomorrow(),
        new Date()
      )
    
      setMinutes((Math.floor(result / 60) % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }))
      setHours(Math.floor(result / 60 / 60))
      setSeconds((result % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }))
      
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!seconds && !minutes && !hours){
    return(
      <div className="countdown"></div>
    )
  }

  return (
    <div className='countdown'>
        New Levels In: {hours}:{minutes}:{seconds}
    </div>
  )
}
