import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getEvents, createEvent } from './EventManager.js'
import { getGames } from "../game/GameManager.js";


export const EventForm = () => {
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
        organizerId: 0
    })
    
    const [isLoading, setIsLoading] = useState(false);

    const [events, setEvents] = useState([]);
    const [games, setGames] = useState([]);

    const history = useHistory()

    useEffect(() => {
        getEvents().then((events) => {
            (console.log(events, "this is events"), setEvents(events));
        })
    }, []);

    useEffect(() => {
      getGames().then((games) => {
          (console.log(games, "this is games"), setGames(games));
      })
  }, []);

    const changeEventState = (domEvent) => {
        const newEvent = { ...currentEvent}
        let selectedVal = domEvent.target.value
        if (domEvent.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newEvent[domEvent.target.name] = selectedVal
        setCurrentEvent(newEvent)
        console.log("see what new event is", newEvent)
        console.log("you hit your change state")
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select value={currentEvent.gameId} name="gameId" id="gameId" onChange={changeEventState} className="form-control">
                        <option value="0">Select a Game</option>
                        {games.map(g => (
                            <option key={g.id} value={g.id}>
                                {g.title}
                        
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        defaultValue={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        defaultValue={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        defaultValue={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="event">Event: </label>
                    <select value={currentEvent.organizerId} name="organizerId" id="organizerId" onChange={changeEventState} className="form-control">
                        <option value="0">Select an Organizer: </option>
                        {events.map(e => (
                            <option key={e.id} value={e.organizer.id}>
                                {e.organizer.user.first_name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

             <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        organizer: parseInt(currentEvent.organizerId)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}