import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes  } from './GameManager.js'


export const GameForm = () => {
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })
    
    const [isLoading, setIsLoading] = useState(false);

    const [gameTypes, setGameTypes] = useState([]);

    const history = useHistory()

    useEffect(() => {
        getGameTypes().then((gameTypes) => {
            setGameTypes(gameTypes);
        })
    }, []);

    const changeGameState = (domEvent) => {
        const newGame = { ...currentGame}
        let selectedVal = domEvent.target.value
        if (domEvent.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newGame[domEvent.target.name] = selectedVal
        setCurrentGame(newGame)
        console.log("you hit your change state")
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select value={currentGame.gameTypeId} name="gameTypeId" id="gameTypeId" onChange={changeGameState} className="form-control">
                        <option value="0">Select a Game Type</option>
                        {gameTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        defaultValue={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        defaultValue={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // This is where the front end connects to the back end via naming conventions
                    const game = {
                        game_type: parseInt(currentGame.gameTypeId),
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}