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
    <>
      <div className="index-screen">
        <div className="section title-section">
          <h1 h1 className="title is-1 has-text-centered index-title">Events in Cardiff</h1>
        </div>
        
        <div className="index-container">
          {events.map( event => (
            <>
              <Link to={`events/${event.id}`} key={event.id}>
                <div className="section">

                  <h1 h1 className="title is-3 white-text">{event.name} at {event.bars[0].name} on {event.day_of_the_week}s</h1>
                  <p className="white-text">{event.tags}</p>
                  <br/>
                  <p className="white-text">{event.description}</p>
                  <img src={event.image} width='100%'/>

                </div>
              </Link>
              <hr className="line-break"/>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default EventIndex
