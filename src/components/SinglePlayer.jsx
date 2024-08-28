import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchPlayer } from "../API";
import DeleteButton from "./DeleteButton";
import HomeButton from "./HomeButton";

const SinglePlayer = ({ selectedPlayer, setSelectedPlayer }) => {
  const { id } = useParams();

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const APIresponse = await fetchPlayer(id);
        if (APIresponse.success) {
          setSelectedPlayer(APIresponse.data.player);
        } else {
          throw new Error(APIresponse.error.message);
        }
      } catch (error) {
        console.error("Failed to fetch player:", error);
      }
    };

    getPlayer();
  }, [id, setSelectedPlayer]);

  return (
    <div className="selectedPlayerCard">
      {selectedPlayer ? (
        <>
          <h1>
            {`${selectedPlayer.name} ${selectedPlayer.breed} ${selectedPlayer.status}`}
          </h1>
          <img src={selectedPlayer.imageUrl} alt="player image" />
          <DeleteButton id={id} isHome={false} />
          <HomeButton />
        </>
      ) : (
        <p>Loading player data...</p>
      )}
    </div>
  );
};

export default SinglePlayer;
