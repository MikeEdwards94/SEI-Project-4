import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddBarCommentForm from './AddBarCommentForm'
import { userIsOwner } from '../helpers/auth'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Link } from 'react-router-dom'
import { timeConverter } from '../helpers/functions'
import AddDealForm from '../deals/AddDealForm'
import { useHistory } from 'react-router-dom'
import EditBarForm from './EditBarForm'
import { userIsAuthenticated } from '../helpers/auth'

const BarShow = () => {

  const params = useParams()

  const history = useHistory()

  const [bar, setBar] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/bars/${params.id}`)
      setBar(data)
    }
    getData()
  }, [])



  const likeBarReview = async (event) => {
    await axios.get(`/api/barreviews/${event.target.value}/likes/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }
  const dislikeBarReview = async (event) => {
    await axios.get(`/api/barreviews/${event.target.value}/dislikes/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }
  const funnyBarReview = async (event) => {
    await axios.get(`/api/barreviews/${event.target.value}/funny/`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }


  const handleDelete = async (event) => {
    await axios.delete(`/api/barreviews/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }

  const handleDealDelete = async (event) => {
    await axios.delete(`/api/deals/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }
  
  const deleteBar = (event) => {
    const deletePrompt = prompt('Please confirm you wish to delete this bar by entering the word \'DELETE\' in all caps')
    if (deletePrompt !== 'DELETE') return null
    if (deletePrompt === 'DELETE') {
      handleBarDelete(event)
    }
  }

  const handleBarDelete = async (event) => {
    await axios.delete(`/api/bars/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push('/')
  }





  

  const [isActive, setIsActive] = useState('')
  const [editIsActive, setEditIsActive] = useState('')





  if (!bar) return ''
  return (
    <div className="show-background section">
      <h2 className="title is-2 white-text margin-top">{bar.name}</h2>
      <p>{bar.tags}</p>

      <br/>

      <div>
        <div className="column">
          <img src={bar.image} />
        </div>
        <br/>
        <div className="column">
          <p>{bar.description}</p>
          <br/>
          <a href={`${bar.website}`} target="_blank" rel="noreferrer">{bar.website}</a>
          <br/>

          <p>Follow us on our social medias</p>
          <br/>
          <div className="level">
            <div className="has-text-centered">

              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} className='big-icon'/>
              </a>
            </div>
            <div className="has-text-centered">

              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitterSquare}  className='big-icon'/>
              </a>
            </div>

            <div className="has-text-centered">
              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagramSquare}  className='big-icon'/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>

      <div>
        { bar.deals &&
      <>
        <h3 className="subtitle is-3 white-text">Weekly Deals</h3>
        <div className="deals-section">
          { bar.deals.map( deal => (
            <div className="individual-bar-deal" key={deal.id}>
              <h4 className="title is-4 white-text">{ deal.day_of_the_week }</h4>
              <h5 className="subtitle is-5 white-text">{ deal.description }</h5>
              { userIsOwner(bar.owner.id) && 
              <>
                <br/>
                <button onClick={handleDealDelete} value={deal.id} className="button is-danger is-outlined is-small home-button">Delete Deal</button>
              </>
              }
            </div>
          ))}
        </div>
      </>
        }
      </div>
      <br/>
      <br/>

      { userIsOwner(bar.owner.id) &&
        <button value={bar.id} onClick={() => setIsActive(!isActive)} className="button is-success is-outlined is-small home-button">Add a Weekly Deal</button>
      }
      { isActive === true &&
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setIsActive(!isActive)}></div>
          <div className="modal-content">
            <AddDealForm 
              setIsActive={setIsActive}
              isActive={isActive}
            />
          </div>
        </div>
      }

      <br/>
      <br/>
      <br/>

      { bar.events &&
      <>
        <h3 className="subtitle is-3 white-text">Events</h3>
        <div className='flex-deal-events'>
          { bar.events.map( event => (
            <>
              <div className="individual-bar-deal" key={event.id}>
                <Link to={`/events/${event.id}`}>
                  <h6 className=" subtitle is-5 white-text">{event.name} on {event.day_of_the_week}s</h6>
                  <p className="white-text">{event.tags}</p>
                  <img src={event.image} />
                </Link>
              </div>

            </>
          ))}
        </div>
      </>
      }
      <br/>
      <br/>
      { userIsOwner(bar.owner.id) &&
        <button value={bar.id} onClick={() => setIsActive(!isActive)} className="button is-success is-outlined is-small home-button">Add a New Event for this Bar</button>
      }
      <br/>
      <br/>





      <h3 className="subtitle is-3 white-text text-left">Reviews</h3>
      { !userIsAuthenticated() &&
        <h3 className="subtitle is-6 white-text text-left">Please Login in order to leave and vote on reviews</h3>
      }

      { bar.bar_reviews &&
        <div className="comments-section">
          { bar.bar_reviews.map( bar => (
            <div key={bar.id} className="individual-comment">
              <article className="media">
                <figure className="media-left">
                  <img src={bar.owner.profile_image} className="image is-64x64" />
                </figure>
                <div className="media-content">
                  <div className="content">
                    <p className="text-left">
                      {bar.owner.username} <small>{timeConverter(`${bar.created_at}`)}</small>
                      <br/>
                      {bar.text}
                      <br/>
                      <button className="review-buttons" onClick={likeBarReview} value={bar.id}>⬆ {bar.likes.length}</button>
                      <button className="review-buttons" onClick={dislikeBarReview} value={bar.id}>⬇ {bar.dislikes.length}</button>
                      <button className="review-buttons" onClick={funnyBarReview} value={bar.id}>😂 {bar.funny.length}</button>
                    </p>

                  </div>
                </div>
                { userIsOwner(bar.owner.id) && 
                <button onClick={handleDelete} value={bar.id} className="button is-danger is-outlined is-small home-button">Delete Review</button>
                }
              </article>
            </div>
          ))}
        </div>
      }

      { userIsAuthenticated() &&
        <AddBarCommentForm />
      }

      <br/>
      <br/>
      <br/>

      { userIsOwner(bar.owner.id) &&
      <>
        <button className="button is-success" value={bar.id} onClick={() => setEditIsActive(!editIsActive)}>Edit Bar</button>
        { editIsActive === true &&
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setEditIsActive(!editIsActive)}></div>
          <div className="modal-content">
            <EditBarForm 
              setIsActive={setEditIsActive}
              isActive={editIsActive}
            />
          </div>
        </div>
        }
        <button className="button is-danger home-button" value={bar.id} onClick={deleteBar}>Delete Bar</button>
      </>
      }
    </div>
  )
}

export default BarShow