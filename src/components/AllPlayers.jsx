import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAllPlayers } from "../API";
import NewPlayerForm from "./NewPlayerForm";
import DeleteButton from "./DeleteButton";
import SeeDetailsButton from "./SeeDetailsButton";

const AllPlayers = ({ setSelectedPlayer }) => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayersData = async () => {
      try {
        const APIresponse = await fetchAllPlayers();
        if (APIresponse.success) {
          setPlayers(APIresponse.data.players);
        } else {
          throw new Error(APIresponse.error.message);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayersData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchParams(e.target.value.toLowerCase());
  };

  const filteredPlayers = searchParams
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchParams)
      )
    : players;

  return (
    <div className="allPlayersContainer">
      <div className="controlPanel">
        <NewPlayerForm players={players} setPlayers={setPlayers} />
        <div className="searchBarContainer">
          <label htmlFor="searchBar">
            Search:
            <input
              id="searchBar"
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      {error ? (
        <p className="errorMessage">Error: {error}</p>
      ) : (
        <div className="playersRoster">
          {filteredPlayers.map((player) => (
            <div className="playerCard" key={player.id}>
              <div
                className="playerDetails"
                onClick={() => {
                  setSelectedPlayer(player);
                  navigate(`/players/${player.id}`);
                }}
              >
                <h2>{player.name}</h2>
                <p>{player.breed}</p>
                <p>{player.status}</p>
              </div>
              <img src={player.imageUrl} alt={`${player.name}`} />
              <DeleteButton id={player.id} isHome={true} />
              <SeeDetailsButton
                player={player}
                setSelectedPlayer={setSelectedPlayer}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPlayers;
