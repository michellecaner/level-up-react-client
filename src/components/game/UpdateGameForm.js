import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getGameById, updateGame, getGameTypes } from "./GameManager"

export const UpdateGameForm = () => {
  const [game, setGame] = useState({
    skillLevel: "",
    numberOfPlayers: "",
    title: "",
    maker: "",
    gameTypeId: ""
  });

  const [gameTypes, setGameTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { gameId } = useParams();

  const history = useHistory();

  const handleFieldChange = evt => {
    const stateToChange = { ...game };
    stateToChange[evt.target.id] = evt.target.value;
    setGame(stateToChange);
  }

  const updateExistingGame = evt => {
    evt.preventDefault()
    setIsLoading(true);

    const editedGame = {
      id: gameId,
      title: game.title,
      maker: game.maker,
      skill_level: parseInt(game.skillLevel),
      number_of_players: parseInt(game.numberOfPlayers),
      game_type: parseInt(game.gameTypeId)
    }

    updateGame(editedGame)
      .then(() => history.push("/games")
      )
  }

  useEffect(() => {
    getGameById(gameId)
      .then(game => {
        setGame({
          skillLevel: game.skill_level,
          numberOfPlayers: game.number_of_players,
          title: game.title,
          maker: game.maker,
          gameTypeId: game.game_type.id
        })
        setIsLoading(false);
        console.log(game)
      });
  }, []);

  useEffect(() => {
    getGameTypes()
      .then(gameTypes => {
        setGameTypes(gameTypes)
        setIsLoading(false);
      });
  }, []);

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Edit Game</h2>
        <div className="form-group">
        <fieldset>
          <label htmlFor="game_type">Game Type: </label>
          <select
            className="form-control"
            onChange={handleFieldChange}
            name="gameTypeId"
            id="gameTypeId"
            value={game.gameTypeId}
          >
            <option value="">Select a Game Type</option>
            {gameTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
      </fieldset>
      <fieldset>
        <label htmlFor="title">Game Title: </label>
        <input
          type="text"
          required
          className="form-control"
          onChange={handleFieldChange}
          id="title"
          value={game.title}
        />
      </fieldset>
      <fieldset>
      <label htmlFor="maker">Game Maker: </label>
      <input
        type="text"
        required
        className="form-control"
        onChange={handleFieldChange}
        id="maker"
        value={game.maker}
      />
      </fieldset>
      <fieldset>
      <label htmlFor="numberOfPlayers">Number of Players: </label>
      <input
        type="number"
        required
        className="form-control"
        onChange={handleFieldChange}
        id="numberOfPlayers"
        value={game.numberOfPlayers}
      />
      </fieldset>
      <fieldset>
      <label htmlFor="skillLevel">Skill Level: </label>
      <input
        type="number"
        required
        className="form-control"
        onChange={handleFieldChange}
        id="skillLevel"
        value={game.skillLevel}
      />
      </fieldset> 
    </div>
  <button
    type="submit"
    disabled={isLoading}
    onClick={updateExistingGame}
    className="btn btn-submit-edit">Submit
  </button>
    </form >
  )






}