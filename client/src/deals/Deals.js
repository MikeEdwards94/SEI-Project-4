import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Deals = () => {

  const [bars, setBars] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/bars/')
      setBars(data)
    }
    getData()
  }, [])

  console.log(bars)







  return (
    <div>
      <h1 h1 className="title is-2">Hot local deals in your area</h1>
      <div className="deals-section">
        { bars.map( deal => (
          <div className="individual-deal" key={deal.id}>
            <p>{ deal.day_of_the_week }</p>
            <p>{ deal.description }</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deals
