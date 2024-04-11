import React, { useEffect, useState } from 'react'

export default function Timer({setTimeUp, timeUp}) {
    const [minutes, setMinutes] = useState(3)
    const [seconds, setSeconds] = useState(0)
    


    useEffect(() => {

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (minutes === 0 && prevSeconds === 0){
                    setTimeUp(true)
                    window.clearInterval(interval)
                    return 0
                }

                if (prevSeconds === 0){
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 0){
                            setTimeUp(true)
                            window.clearInterval(interval)
                            return 0
                        }
                        else{
                            return prevMinutes - 1
                        }
                    })
                    return 59
                }
                else{
                    return prevSeconds - 1
                }

            })

        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [])



    return (
        <div className='timer'>
            {minutes}:{seconds.toString().length === 2 ? seconds : `0${seconds}`}
        </div>
    )
}
