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


  return (
    <div className="index-screen-bar">
      <div className="section title-section">
        <h1 h1 className="title is-1 has-text-centered index-title-bar">Cardiff Bars</h1>
      </div>
      <div className="index-container-bar">

        {bars.map( bar => (
          <>
            <Link to={`bars/${bar.id}`} key={bar._id}>
              <div className="section" key={bar._id}>

                <h1 h1 className="title is-3 white-text">{bar.name}</h1>
                <p className="white-text">{bar.tags}</p>
                <br/>
                <p className="white-text">{bar.description}</p>
                <img src={bar.image} width='100%' />

              </div>
            </Link>
            <hr className="line-break-white"/>
          </>
        ))}


      </div>
    </div>
  )
}

export default BarIndex
