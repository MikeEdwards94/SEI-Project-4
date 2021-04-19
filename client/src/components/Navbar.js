import React from 'react'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'


const Navbar = () => {

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.location.reload()
  }


  return (
    <>
      <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="images/logo.png" width="112" height="28" />
          </Link>


          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/bars" className="navbar-item">
              <strong>Bars</strong>
            </Link>

            <Link to="/events" className="navbar-item">
              <strong>Events</strong>
            </Link>
            
            <Link to="/deals" className="navbar-item">
              <strong>Deals</strong>
            </Link>

          
          </div>

          <div className="navbar-end">
            { !userIsAuthenticated() &&
                  <>
                    <Link to="/register" className="navbar-item">
                      <strong>Sign up</strong>
                    </Link>
                    <Link to="/login"  className="navbar-item">
                      <strong>Log in</strong>
                    </Link>
                  </>
            }
            { userIsAuthenticated() &&
          <p onClick={handleLogout} className="navbar-item">Log out</p>
            }
          </div>
        </div>
      </nav>
    </>



  )
}

export default Navbar