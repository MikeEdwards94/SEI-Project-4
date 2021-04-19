import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddCommentForm from './AddCommentForm'
import { userIsOwner } from '../helpers/auth'
import { getTokenFromLocalStorage } from '../helpers/auth'


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

  const handleDelete = async (event) => {
    await axios.delete(`/api/eventreviews/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }




  return (
    <div className='show-background section'>
      <h1 h1 className="title is-1 white-text">{event.name}</h1>
      <p>{event.tags}</p>
      
      <br/>

      { event.bars &&
              <p>{event.day_of_the_week}s at { event.bars[0].name }</p>
      }

      <br/>

      <div className="columns">
        <div className="column">

          <img src={event.image} />
        </div>

        <div className="column show-flex">
          <p>{event.description}</p>
          <br/>
          <a href={`${event.website}`} target="_blank" rel="noreferrer">{event.website}</a>
          <br/>


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
        </div>

      </div>




      <br/>
      <br/>

      <h1 h1 className="title is-3 white-text text-left">Reviews</h1>
      { event.event_reviews &&
        <div className="comments-section">
          { event.event_reviews.map( review => (
            <div key={review.id} className="individual-comment">
              <article className="media">
                <figure className="media-left">
                  <img src={review.owner.profile_image} className="image is-64x64" />
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p className="text-left">
                      {review.owner.username} <small>31m ago</small>
                      <br/>
                      {review.text}
                    </p>
                  </div>
                </div>
                { userIsOwner(review.owner.id) && 
                <button onClick={handleDelete} value={review.id} className="button is-danger is-outlined is-small home-button">Delete Review</button>
                }
              </article>
            </div>
          ))}
        </div>
      }
      

      <AddCommentForm />

    </div>
  )
}

export default EventShow