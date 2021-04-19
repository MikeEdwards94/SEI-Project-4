import React from 'react'
import { Link } from 'react-router-dom'

const Deal = ({ deal }) => {
  return (
    <div className="individual-deal">
      <Link to={`bars/${deal.bar.id}`}  key={deal.id}>

        <h5 className="title is-5 white-text">{ deal.description }</h5>
        <h6 className="subtitle is-6 white-text">At { deal.bar.name }</h6>
        <img src={deal.bar.image} width='90%' />

      </Link>
    </div>

  )
}

export default Deal
