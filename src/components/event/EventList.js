import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

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
                    </section>
                })
            }
        </article>
    )
}