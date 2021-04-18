import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EventIndex = () => {

  const [events, SetEvents] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/events/')
      SetEvents(data)
    }
    getData()
  }, [])


  return (
    <div className="index-screen">
      <div className="section title-section">
        <h1 h1 className="title is-1 has-text-centered index-title">Events in Cardiff</h1>
      </div>
      <div className="index-container">
        {events.map( event => (
          <>
            <Link to={`events/${event.id}`} key={event.id}>
              <div className="section">

                <h1 h1 className="title is-3">{event.name} at {event.bars[0].name}</h1>
                <p>{event.tags}</p>
                <img src={event.image} />
                <p>{event.description}</p>

              </div>
            </Link>
            <hr/>
          </>
        ))}
      </div>
    </div>
  )
}

export default EventIndex
