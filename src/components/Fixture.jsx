import React, { useEffect, useState } from 'react'
import players from '../players'
import Cross from "../images/cross.png"
import Tick from "../images/tick.png"

export default function Fixture({fixture, level, score, prevGuess, prevSeason}) {
    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        if (prevGuess){
            setInput(prevGuess)
        }
    }, [])

    const seasons = []
    for(let i=2025; i >= 1992; i--){
        let twoDigits = Number(i.toString().slice(-2))
        if (twoDigits === 99){
            twoDigits = "00"
        }
        else if (twoDigits <= 8){
            twoDigits = `0${twoDigits+1}`
        }
        else{
            twoDigits += 1
        }
        seasons.push(`${i}/${twoDigits}`)
    }

    function changeHandler(e){
        setInput(e.target.value)

        if (e.target.value === ""){
            setSuggestions([])
            return
        }

        const options = []
        for (const player of players){
            const names = player.split(" ")

            let surname = ""
            if (names.length > 1){
                surname = names [1]
            }
            
            if (player.toLowerCase().startsWith(e.target.value.toLowerCase()) || surname.toLowerCase().startsWith(e.target.value.toLowerCase())){
                options.push(player)
            }
        }
        setSuggestions(options)
    }

    function clickHandler(e){
        setInput(e.target.innerHTML)
        setSuggestions([])
    }

    function blurHandler(e){
        if (e.relatedTarget  && e.relatedTarget.className === "suggestion"){
            return
        }
        else{
            setSuggestions([])
        }
    }

    if(score !== null){
        const season = prevSeason || document.getElementById(`season${level}`).value
        return(
            <div className="fixture">
                <div className="question">
                    <p className='level'>Level {level} - <em>for a maximum of {level * 2} points</em> </p>
                    <p className='fixture-details'><strong>{fixture.awayTeam}</strong> at <strong>{fixture.stadium}</strong></p>
                </div>
                <div className="answer">
                    <div className='answer-marked'>
                        <p className="player-guess">{input}</p>
                        {score > 0 ? <img src={Tick} alt='Correct'/> : <img src={Cross} alt='Incorrect'/>}
                    </div>
                    <div className='answer-marked'>
                        <p className="season-guess">{season}</p>
                        {score === level * 2 ? <img src={Tick} alt='Correct'/> : <img src={Cross} alt='Incorrect'/>}
                    </div>
                    
                </div>
            </div>
        )
    }
  
    return (
    <div className='fixture'>
        <div className="question">
            <p className='level'>Level {level} - <em>for a maximum of {level * 2} points</em> </p>
            <p className='fixture-details'><strong>{fixture.awayTeam}</strong> at <strong>{fixture.stadium}</strong></p>
        </div>
        <div className="answer">
            <input id={`player${level}`}type="text" className='guess-player' value={input} onChange={(e) => changeHandler(e)} onBlur={(e) => blurHandler(e)} autoComplete='off'/>
            
            {suggestions.length >= 1 ? <div className="suggestions">
                {suggestions.map((suggestion, i) => {
                    return(
                        <div className='suggestion' onClick={(e) => clickHandler(e)} key={i} tabIndex={0}>{suggestion}</div>
                    )
                    
                })}
            </div> : ""}
            
            
            
            <select name="season" id={`season${level}`}>
                {seasons.map((season) => {
                    return(
                        <option key={season} value={season}>{season}</option>
                    )
                })}

            </select>
        </div>

    </div>
  )
}
