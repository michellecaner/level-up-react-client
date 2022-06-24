import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getEvents, deleteEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleDeleteEvent = id => {
        deleteEvent(id)
            .then(() => getEvents().then
                (setEvents))
    };

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">You're invited to a {event.game.title} party!</div>
                        <div className="event__description"> The details: {event.description}</div>
                        <div className="event__date__time">
                          When: {event.date} at {event.time}</div>
                        <div className="event__organizer">Event organizer is {event.organizer.user.first_name}</div>
                        <button className="event__delete__btn"
                            onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                    </section>
                })
            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
        </article>
    )
}