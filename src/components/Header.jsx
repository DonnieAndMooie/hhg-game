import React from 'react'
import flag from "../images/flag.jpeg"
import link from "../images/link.png"
import helpImg from "../images/help.png"

export default function Header({setHelp, help}) {
  return (
    <header>
        <img className='flag' src={flag} alt="Football Cliches" />
        <div>
          <h1>Happy Hunting Grounds</h1>
          <p><em>As heard on Football Clichés</em>
            <a href="https://t.co/OyljoYd55W" target='_blank'>
              <img src={link} alt="link" />
            </a>
          </p>
        </div>
        <img src={helpImg} alt="Help" className='help-icon' onClick={() => setHelp(!help)}/>
    </header>
  )
}
