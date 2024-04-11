import React, { useEffect, useState } from 'react'
import Fixture from './Fixture'
import Timer from './Timer'

export default function Game({fixtures}) {
  const [score, setScore] = useState(null)
  const [levelOneScore, setLevelOneScore] = useState(null)
  const [levelTwoScore, setLevelTwoScore] = useState(null)
  const [levelThreeScore, setLevelThreeScore] = useState(null)
  const [levelFourScore, setLevelFourScore] = useState(null)
  const [levelFiveScore, setLevelFiveScore] = useState(null)
  const [error, setError] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    if (timeUp){
      checkAnswers()
    }
  }, [timeUp])

  function checkAnswers(){

    const level1Guess = document.getElementById("player1").value
    const level2Guess = document.getElementById("player2").value
    const level3Guess = document.getElementById("player3").value
    const level4Guess = document.getElementById("player4").value
    const level5Guess = document.getElementById("player5").value

    if ((level1Guess === "" || level2Guess === "" || level3Guess === "" || level4Guess === "" || level5Guess === "") && timeUp === false){
      setError(true)
      return
    }

    checkAnswer(1, setLevelOneScore, fixtures.levelOne.answers)
    checkAnswer(2, setLevelTwoScore, fixtures.levelTwo.answers)
    checkAnswer(3, setLevelThreeScore, fixtures.levelThree.answers)
    checkAnswer(4, setLevelFourScore, fixtures.levelFour.answers)
    checkAnswer(5, setLevelFiveScore, fixtures.levelFive.answers)
    setError(false)
    setScore(levelOneScore + levelTwoScore + levelThreeScore + levelFourScore + levelFiveScore)
}

  function checkAnswer(level, setScore, answers){
    const season = document.getElementById(`season${level}`).value
    const player = document.getElementById(`player${level}`).value

    setScore(0)
    for (const answer of answers){
      if(answer.season === season && answer.player === player){
        setScore(level * 2)
        break
      }
      else if(answer.player === player){
        setScore(level)
      }
    }
  }

  return (
    <div className='game'>
      {timeUp ? <div className='time-up'>Time Up!</div> : score !== null ? "" : <Timer setTimeUp={setTimeUp} timeUp={timeUp}/>}
      
      {score !== null ? <div className='score'>You scored {levelOneScore + levelTwoScore + levelThreeScore + levelFourScore + levelFiveScore}/30</div> : ""}
      {error ? <p className='error'>Please answer all questions</p> : ""}
        <Fixture fixture={fixtures.levelOne} level={1} score={levelOneScore}/>
        <Fixture fixture={fixtures.levelTwo} level={2} score={levelTwoScore}/>
        <Fixture fixture={fixtures.levelThree} level={3} score={levelThreeScore}/>
        <Fixture fixture={fixtures.levelFour} level={4} score={levelFourScore}/>
        <Fixture fixture={fixtures.levelFive} level={5} score={levelFiveScore}/>
        {score !== null ? "" : <button onClick={() => checkAnswers()} className="submit">Submit Answers</button>}
        
        
    </div>
  )
}
