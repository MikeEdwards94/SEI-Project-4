import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddCommentForm from './AddCommentForm'

const EventShow = () => {

  const params = useParams()

  const [event, SetEvent] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/events/${params.id}`)
      SetEvent(data)
    }
    getData()
  }, [])







  return (
    <div>
      <h1 h1 className="title is-3">{event.name}</h1>
      <p>{event.tags}</p>
      
      { event.bars &&
        <p>Location: { event.bars[0].name }</p>
      }

      <img src={event.image} />
      <p>{event.day_of_the_week}</p>
      <p>{event.description}</p>
      <p>{event.website}</p>



      <div className="level">
        <div className="level-item has-text-centered">

          <a href={`${event.fb_link}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebookSquare} className='big-icon'/>
          </a>
        </div>
        <div className="level-item has-text-centered">

          <a href={`${event.fb_link}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitterSquare}  className='big-icon'/>
          </a>
        </div>

        <div className="level-item has-text-centered">
          <a href={`${event.fb_link}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagramSquare}  className='big-icon'/>
          </a>
        </div>

      </div>

      <br/>
      <br/>

      <h1 h1 className="title is-3">Reviews</h1>
      { event.event_reviews &&
        <div className="comments-section">
          { event.event_reviews.map( review => (
            <div className="individual-comment" key={review.id}>
              <p>{ review.owner.username }</p>
              <p>{ review.created_at}</p>
              <p>{ review.text}</p>
            </div>
          ))}
        </div>
      }

      <AddCommentForm />

    </div>
  )
}

export default EventShow