import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddBarCommentForm from './AddBarCommentForm'
import { userIsOwner } from '../helpers/auth'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { Link } from 'react-router-dom'


const BarShow = () => {

  const params = useParams()

  const [bar, setBar] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/bars/${params.id}`)
      setBar(data)
    }
    getData()
  }, [])

  const handleDelete = async (event) => {
    await axios.delete(`/api/barreviews/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    window.location.reload()
  }

  function timeConverter(time) {
    return (time.slice(0, 10).split('-').reverse().join('-'))
  }

  return (
    <div className="show-background section">
      <h1 h1 className="title is-3 white-text">{bar.name}</h1>
      <p>{bar.tags}</p>

      <br/>

      <div className="columns">
        <div className="column">
          <img src={bar.image} />
        </div>
        <div className="column show-flex">
          <p>{bar.description}</p>
          <br/>
          <a href={`${bar.website}`} target="_blank" rel="noreferrer">{bar.website}</a>
          <br/>


          <div className="level">
            <div className="level-item has-text-centered">

              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookSquare} className='big-icon'/>
              </a>
            </div>
            <div className="level-item has-text-centered">

              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitterSquare}  className='big-icon'/>
              </a>
            </div>

            <div className="level-item has-text-centered">
              <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagramSquare}  className='big-icon'/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>

      { bar.deals &&
      <>
        <h4 className="subtitle is-4 white-text">Weekly Deals</h4>
        <div className="deals-section">
          { bar.deals.map( deal => (
            <div className="individual-bar-deal" key={deal.id}>
              <p>{ deal.day_of_the_week }</p>
              <p>{ deal.description }</p>
            </div>
          ))}
        </div>
      </>
      }
      <br/>
      <br/>
      <br/>
      <br/>

      { bar.events &&
      <>
        <h4 className="subtitle is-4 white-text">Events</h4>
        <div className='flex-deal-events'>
          { bar.events.map( event => (
            <>
              <div className="individual-bar-deal" key={event.id}>
                <Link to={`/events/${event.id}`}>
                  <p className="white-text">{event.name}</p>
                  <p className="white-text">{event.day_of_the_week}</p>
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
      <br/>





      <h3 className="subtitle is-3 white-text text-left">Reviews</h3>
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

      <AddBarCommentForm />

    </div>
  )
}

export default BarShow