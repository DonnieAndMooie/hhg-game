import React from 'react'
import { Share } from 'react-twitter-widgets'


export default function TweetButton({score, levelOneScore, levelTwoScore, levelThreeScore, levelFourScore, levelFiveScore}) {

  let grid = ""
  if (levelOneScore === 2){
    grid += "✅✅ \n"
  }
  else if (levelOneScore === 1){
    grid += "✅❌ \n"
  }
  else{
    grid += "❌❌ \n"
  }

  if (levelTwoScore === 4){
    grid += "✅✅ \n"
  }
  else if (levelTwoScore === 2){
    grid += "✅❌ \n"
  }
  else{
    grid += "❌❌ \n"
  }

  if (levelThreeScore === 6){
    grid += "✅✅ \n"
  }
  else if (levelThreeScore === 3){
    grid += "✅❌ \n"
  }
  else{
    grid += "❌❌ \n"
  }

  if (levelFourScore === 8){
    grid += "✅✅ \n"
  }
  else if (levelFourScore === 4){
    grid += "✅❌ \n"
  }
  else{
    grid += "❌❌ \n"
  }

  if (levelFiveScore === 10){
    grid += "✅✅ \n"
  }
  else if (levelFiveScore === 5){
    grid += "✅❌ \n"
  }
  else{
    grid += "❌❌ \n"
  }

  return (
    <div className='share'>
        <p>Share your score:</p>
        <Share
        url="https://donnieandmooie.github.io/hhg-game/"
        options={{
            size: 'large',
            text:`Happy Hunting Grounds \n${new Date().toDateString()} \n${score}/30 \n${grid} \n#HappyHuntingGrounds`,
  }}/>

    </div>
  )
}
