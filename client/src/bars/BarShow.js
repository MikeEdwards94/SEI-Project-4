import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import AddBarCommentForm from './AddBarCommentForm'

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







  return (
    <div>
      <h1 h1 className="title is-3">{bar.name}</h1>
      <p>{bar.tags}</p>
      <img src={bar.image} />
      <p>{bar.description}</p>

      { bar.deals &&
        <div className="deals-section">
          { bar.deals.map( deal => (
            <div className="individual-deal" key={deal.id}>
              <p>{ deal.day_of_the_week }</p>
              <p>{ deal.description }</p>
            </div>
          ))}
        </div>

      }

      <div className="social-medias">
        <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebookSquare} />
        </a>
        <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
        <a href={`${bar.fb_link}`} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagramSquare} />
        </a>
      </div>

      { bar.bar_reviews &&
        <div className="comments-section">
          { bar.bar_reviews.map( review => (
            <div className="individual-comment" key={review.id}>
              <p>{ review.owner.username }</p>
              <p>{ review.created_at}</p>
              <p>{ review.text}</p>
            </div>
          ))}
        </div>
      }

      <AddBarCommentForm />

    </div>
  )
}

export default BarShow