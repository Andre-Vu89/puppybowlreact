import { useState } from "react";
import { createPlayer } from "../API";

const NewPlayerForm = ({ players, setPlayers }) => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newBreed, setNewBreed] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPlayer(newPlayerName, newBreed, newImageUrl);
      setPlayers((prevPlayers) => [...prevPlayers, response.data.newPlayer]);
    } catch (error) {
      console.error("Error creating new player:", error);
    }
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  return (
    <form id="submitForm" onSubmit={handleSubmit}>
      <h3>Add a New Player:</h3>
      <div className="formInputs">
        <InputField
          label="Player Name:"
          value={newPlayerName}
          onChange={handleInputChange(setNewPlayerName)}
        />
        <InputField
          label="Breed:"
          value={newBreed}
          onChange={handleInputChange(setNewBreed)}
        />
        <InputField
          label="Image URL:"
          value={newImageUrl}
          onChange={handleInputChange(setNewImageUrl)}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const InputField = ({ label, value, onChange }) => (
  <label className="inputLabel">
    {label}
    <input
      className="inputForm"
      type="text"
      value={value}
      required
      onChange={onChange}
    />
  </label>
);

export default NewPlayerForm;
