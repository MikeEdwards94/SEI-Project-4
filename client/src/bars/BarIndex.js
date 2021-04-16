import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BarIndex = () => {

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
      <h1 h1 className="title is-2">All Bars</h1>
    
      {bars.map( bar => (
        <Link to={`bars/${bar.id}`} key={bar._id}>
          <div key={bar._id}>

            <h1 h1 className="title is-3">{bar.name}</h1>
            <p>{bar.tags}</p>
            <img src={bar.image} />
            <p>{bar.description}</p>

          </div>
        </Link>
      ))}


    </div>
  )
}

export default BarIndex
