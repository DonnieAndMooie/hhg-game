import { useEffect, useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Help from "./components/Help";

function App() {
  const [fixtures, setFixtures] = useState(null)
  const [help, setHelp] = useState(false)

  useEffect(() => {
    async function fetchFixtures(){
      const response = await fetch("https://calm-jade-cygnet-wear.cyclic.app/daily-fixtures")
      const data = await response.json()
      setFixtures(data)
    }
    fetchFixtures()
  }, [])

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
      <Game fixtures={fixtures}/>
    </div>
  );
}

export default App;
