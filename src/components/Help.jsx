import React from 'react'
import Cross from "../images/cross.png"

export default function Help({setHelp}) {
  return (
    <div className='help'>
        <img src={Cross} alt="Close" className='close-icon' onClick={() => setHelp(false)}/>
        <h1>How To Play</h1>
        <p>The game consists of 5 levels, increasing in difficulty.</p>
        <p>For each level you will be given a combination of Premier League team and stadium. </p>
        <p>You must name a goalscorer in each fixture and the season they scored it.</p>
        <p>You will have a time limit of 3 minutes to complete all 5 levels.</p>
        <div className="space"></div>
        <p>You will score points based on the difficulty of the level.</p>
        <p>For naming the goalscorer, you will score the same number of points as the difficulty of the level. For example, on a level 1 question, you will get 1 point, for a level 2 question you'll get 2 points etc...</p>
        <p>You can double your points by also getting the season correct. For example, if you get the goalscorer and season correct on a level 2 question, you would get a total of 4 points.</p>
        <div className="space"></div>
        <p>The maximum possible score is 30 points.</p>
        <p>There will be a new set of levels every day! So make sure to check back daily!</p>
    </div>
  )
}
