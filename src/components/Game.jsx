import React, { useEffect, useState } from 'react'
import Fixture from './Fixture'
import Timer from './Timer'
import TweetButton from './TweetButton'

export default function Game({fixtures, prevGuesses}) {
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

  useEffect(() => {
    console.log(prevGuesses)
    if (prevGuesses){
      document.getElementById("player1").value = prevGuesses.level1Guess
      document.getElementById("player2").value = prevGuesses.level2Guess
      document.getElementById("player3").value = prevGuesses.level3Guess
      document.getElementById("player4").value = prevGuesses.level4Guess
      document.getElementById("player5").value = prevGuesses.level5Guess
    
      document.getElementById("season1").value = prevGuesses.level1Season
      document.getElementById("season2").value = prevGuesses.level2Season
      document.getElementById("season3").value = prevGuesses.level3Season
      document.getElementById("season4").value = prevGuesses.level4Season
      document.getElementById("season5").value = prevGuesses.level5Season
    


      checkAnswers()
    }
  }, [])

  function checkAnswers(){

    const level1Guess = document.getElementById("player1").value
    const level2Guess = document.getElementById("player2").value
    const level3Guess = document.getElementById("player3").value
    const level4Guess = document.getElementById("player4").value
    const level5Guess = document.getElementById("player5").value

    if ((level1Guess === "" || level2Guess === "" || level3Guess === "" || level4Guess === "" || level5Guess === "") && timeUp === false && !prevGuesses){
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

    localStorage.setItem("guesses", JSON.stringify({
      level1Guess: level1Guess,
      level2Guess: level2Guess,
      level3Guess: level3Guess,
      level4Guess: level4Guess,
      level5Guess: level5Guess,
      level1Season: document.getElementById("season1").value,
      level2Season: document.getElementById("season2").value,
      level3Season: document.getElementById("season3").value,
      level4Season: document.getElementById("season4").value,
      level5Season: document.getElementById("season5").value,
      timestamp: fixtures.timestamp
    }))


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
      {score !== null ? <TweetButton score={levelOneScore + levelTwoScore + levelThreeScore + levelFourScore + levelFiveScore} levelOneScore={levelOneScore} levelTwoScore={levelTwoScore} levelThreeScore={levelThreeScore} levelFourScore={levelFourScore} levelFiveScore={levelFiveScore}/> : ""}
      {error ? <p className='error'>Please answer all questions</p> : ""}
        <Fixture fixture={fixtures.levelOne} level={1} score={levelOneScore} prevGuess={prevGuesses ? prevGuesses.level1Guess : null} prevSeason={prevGuesses ? prevGuesses.level1Season : null}/>
        <Fixture fixture={fixtures.levelTwo} level={2} score={levelTwoScore} prevGuess={prevGuesses ? prevGuesses.level2Guess : null} prevSeason={prevGuesses ? prevGuesses.level2Season : null}/>
        <Fixture fixture={fixtures.levelThree} level={3} score={levelThreeScore} prevGuess={prevGuesses ? prevGuesses.level3Guess : null} prevSeason={prevGuesses ? prevGuesses.level3Season : null}/>
        <Fixture fixture={fixtures.levelFour} level={4} score={levelFourScore} prevGuess={prevGuesses ? prevGuesses.level4Guess : null} prevSeason={prevGuesses ? prevGuesses.level4Season : null}/>
        <Fixture fixture={fixtures.levelFive} level={5} score={levelFiveScore} prevGuess={prevGuesses ? prevGuesses.level5Guess : null} prevSeason={prevGuesses ? prevGuesses.level5Season : null}/>
        {score !== null ? "" : <button onClick={() => checkAnswers()} className="submit">Submit Answers</button>}
        
        
    </div>
  )
}
