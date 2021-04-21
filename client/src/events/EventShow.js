import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddCommentForm from './AddCommentForm'
import { userIsOwner } from '../helpers/auth'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { timeConverter } from '../helpers/functions'
import EditEventForm from './EditEventForm'
import { useHistory } from 'react-router-dom'

const EventShow = () => {

  const history = useHistory()

  const params = useParams()

  const [event, SetEvent] = useState(null)

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



  const likeEventReview = async (event) => {
    await axios.get(`/api/eventreviews/${event.target.value}/likes/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }
  const dislikeEventReview = async (event) => {
    await axios.get(`/api/eventreviews/${event.target.value}/dislikes/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }
  const funnyEventReview = async (event) => {
    await axios.get(`/api/eventreviews/${event.target.value}/funny/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }

  const [editIsActive, setEditIsActive] = useState('')


  const deleteBar = (event) => {
    const deletePrompt = prompt('Please confirm you wish to delete this event by entering the word \'DELETE\' in all caps')
    if (deletePrompt !== 'DELETE') return null
    if (deletePrompt === 'DELETE') {
      handleEventDelete(event)
    }
  }

  const handleEventDelete = async (event) => {
    await axios.delete(`/api/events/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push('/')
  }







  if ( !event ) return null

  return (
    <div className='show-background section'>
      
      <br/>

      <h3 className="title is-3 white-text">
        {event.name}
      </h3>
      { event.bars.length === 0 &&
        <h4 className="title is-4 white-text">
          Venue TBD
        </h4>
      }
      { event.bars.length > 0 &&
        <h4 className="title is-4 white-text">
          {event.day_of_the_week}s At {event.bars[0].name}
        </h4>
      }

      <br/>
      <p>{event.tags}</p>

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
                      {review.owner.username} <small>{timeConverter(`${review.created_at}`)}</small>
                      <br/>
                      {review.text}
                      <br/>
                      <button className="review-buttons" onClick={likeEventReview} value={review.id}>⬆ {review.likes.length}</button>
                      <button className="review-buttons" onClick={dislikeEventReview} value={review.id}>⬇ {review.dislikes.length}</button>
                      <button className="review-buttons" onClick={funnyEventReview} value={review.id}>😂 {review.funny.length}</button>
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


      { userIsOwner(event.owner.id) &&
      <>
        <button className="button is-success" value={event.id} onClick={() => setEditIsActive(!editIsActive)}>Edit Event</button>
        { editIsActive === true &&
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setEditIsActive(!editIsActive)}></div>
          <div className="modal-content">
            <EditEventForm 
              setIsActive={setEditIsActive}
              isActive={editIsActive}
            />
          </div>
        </div>
        }
        <button className="button is-danger home-button" value={event.id} onClick={deleteBar}>Delete Event</button>
      </>
      }
    </div>
  )
}

export default EventShow