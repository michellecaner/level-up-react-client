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
      skillLevel: game.skillLevel,
      numberOfPlayers: game.numberOfPlayers,
      gameTypeId: game.gameTypeId
    }

    updateGame(game)
      .then(() => history.push("/games")
      )
  }

  useEffect(() => {
    getGameById(gameId)
      .then(game => {
        setGame(game)
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getGameTypes()
      .then(gameTypes => {
        setGameTypes(gameTypes)
      });
  }, []);

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Edit Game</h2>
      <fieldset>
        <div className="form-group">

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
          <label htmlFor="game_type">Game Type: </label>

          <input
            type="text"
            required
            className="form-control"
            onChange={handleFieldChange}
            id="title"
            value={game.title}
          />
          <label htmlFor="title">Game Title: </label>

          <input
            type="text"
            required
            className="form-control"
            onChange={handleFieldChange}
            id="maker"
            value={game.maker}
          />
          <label htmlFor="title">Game Maker: </label>

          <input
            type="text"
            required
            className="form-control"
            onChange={handleFieldChange}
            id="numberOfPlayers"
            value={game.numberOfPlayers}
          />
          <label htmlFor="title">Number of Players: </label>

          <input
            type="text"
            required
            className="form-control"
            onChange={handleFieldChange}
            id="skillLevel"
            value={game.skillLevel}
          />
          <label htmlFor="title">Skill Level: </label>
        </div>
      </fieldset>

      <button 
        type="submit"
        disabled={isLoading}
        onClick={updateExistingGame}
        className="btn btn-submit-edit">Submit
      </button>
    </form>
  )






}