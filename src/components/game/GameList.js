import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getGames, deleteGame } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])

    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const handleDeleteGame = id => {
        deleteGame(id)
            .then(() => getGames().then
                (setGames))
    };

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="game__edit__btn"
                            onClick={() => {
                                history.push({ pathname: `/games/${game.id}/edit` })
                            }}
                        >Edit Game</button>
                        <button className="game__delete__btn"
                            onClick={() => handleDeleteGame(game.id)}>Delete Game</button>
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: `/games/new` })
                }}
            >Register New Game</button>
        </article>
    )
}