import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-screen">
      <div className="home-background">
        <div className="home-flex">
          
          <Link to="/bars">
            <button className="button is-info is-outlined home-button">Find a destination</button>
          </Link>
          
          <Link to="/events">
            <button className="button is-info is-outlined home-button">Find an event</button>
          </Link>

          <Link to="/deals">
            <button className="button is-info is-outlined home-button">Find a deal</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Home
