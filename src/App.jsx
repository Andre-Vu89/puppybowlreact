import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <>

      <h1>Puppy Bowl!!</h1>


      <Routes>
        <Route
          path="/"
          element={
            <AllPlayers
              setSelectedPlayer={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
            />
          }
        />
        <Route
          path="/players/:id"
          element={
            <SinglePlayer
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          }
        />

      </Routes>
    </>
  );
}

export default App;

