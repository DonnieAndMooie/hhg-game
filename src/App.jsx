import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Help from "./components/Help";

function App() {
  const [fixtures, setFixtures] = useState(null)
  const [help, setHelp] = useState(false)
  const [prevGuesses, setPrevGuesses] = useState(null)

  useEffect(() => {
    async function fetchFixtures(){
      const response = await fetch(process.env.REACT_APP_API)
      const data = await response.json()
      setFixtures(data)
    }
    fetchFixtures()
  }, [])

  useEffect(() => {
    const visited = localStorage.getItem("visited")
    if (visited === null){
      setHelp(true)
      localStorage.setItem("visited", true)
    }
    const guesses = localStorage.getItem("guesses")
    if (guesses){
      const savedDate = new Date(JSON.parse(guesses).timestamp)
      if (savedDate.toDateString() === new Date().toDateString()){
        setPrevGuesses(JSON.parse(guesses))
      }
      else{
        localStorage.removeItem("guesses")
        setPrevGuesses(null)
      }
    }
  }, [help])

  if (!fixtures){
    return(
      <div className="App">
        <Header setHelp={setHelp} help={help}/>
        <div className="loading">Loading...</div>
      </div>

    )
  }

  if (help){
    return(
      <div>
        <Header setHelp={setHelp} help={help}/>
        <Help setHelp={setHelp}/>
      </div>
    )
  }

  return (
    <div className="App">
      <Header setHelp={setHelp} help={help}/>
      <Game fixtures={fixtures} prevGuesses={prevGuesses}/>
    </div>
  );
}

export default App;
