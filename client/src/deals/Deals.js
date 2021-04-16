import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Deals = () => {

  const [deals, setDeals] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/deals/')
      setDeals(data)
    }
    getData()
  }, [])

  console.log(deals)







  return (
    <div>
      <h1 h1 className="title is-2">Hot local deals in your area</h1>
      <div className="deals-section">
        { deals.map( deal => (
          <Link to={`bars/${deal.bar.id}`}  key={deal.id}>

            <div className="individual-deal">
              <p>{ deal.day_of_the_week }</p>
              <p>{ deal.description } at { deal.bar.name }</p>
              <img src={deal.bar.image} />
            </div>
          </Link>

        ))}
      </div>
    </div>
  )
}

export default Deals
