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
    <div>
      <h1 h1 className="title is-2">All Events</h1>

      {events.map( event => (
        <Link to={`events/${event.id}`} key={event.id}>
          <div>

            <h1 h1 className="title is-3">{event.name} at {event.bars[0].name}</h1>
            <p>{event.tags}</p>
            <img src={event.image} />
            <p>{event.description}</p>

          </div>
        </Link>
      ))}










    </div>
  )
}

export default EventIndex
