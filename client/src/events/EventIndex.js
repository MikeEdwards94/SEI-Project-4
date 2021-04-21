import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddNewEvent from './AddNewEvent'
import { userIsAuthenticated } from '../helpers/auth'

const EventIndex = () => {

  const [events, SetEvents] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/events/')
      SetEvents(data)
    }
    getData()
  }, [])

  const [isActive, setIsActive] = useState('')


  return (
    <>
      <div className="index-screen">
        <div className="section title-section">
          <h1 h1 className="title is-1 has-text-centered index-title">Events in Cardiff</h1>
        </div>
        
        <div className="index-container">
        
        
          { userIsAuthenticated() &&
          <p className="navbar-item" onClick={() => setIsActive(!isActive)}>To add your own event to this list click here</p>
          }
          { isActive === true &&
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setIsActive(!isActive)}></div>
            <div className="modal-content">
              <AddNewEvent 
                setIsActive={setIsActive}
                isActive={isActive}
              />
            </div>
          </div>
          }
        
        
        
        
        
          {events.map( event => (
            <>
              <Link to={`events/${event.id}`} key={event.id}>
                <div className="section">

                  <h3 className="title is-3 white-text">
                    {event.name} on {event.day_of_the_week}s
                  </h3>
                  { event.bars.length !== 0 &&
                  <h4 className="title is-4 white-text">
                    At {event.bars[0].name}
                  </h4>
                  }

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
