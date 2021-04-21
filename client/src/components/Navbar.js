import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userIsAuthenticated } from '../helpers/auth'
import Login from '../auth/Login'
import Registration from '../auth/Registration'

const Navbar = () => {

  const [isActive, setIsActive] = useState('')
  
  const [regIsActive, setRegIsActive] = useState('')

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <>
      <nav className="navbar is-black is-fixed-top" role="navigation" aria-label="main navigation">
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
                    {/* <Link to="/register" className="navbar-item">
                      <strong>Sign up</strong>
                    </Link> */}
                    <a onClick={() => setRegIsActive(!regIsActive)} className="navbar-item">
                      <strong>Register</strong>
                    </a>
                    { regIsActive === true &&
                      <div className="modal is-active">
                        <div className="modal-background" onClick={() => setRegIsActive(!regIsActive)}></div>
                        <div className="modal-content">
                          <Registration 
                            setRegIsActive={setRegIsActive}
                            regIsActive={regIsActive}
                          />
                        </div>
                      </div>
                    }
                    {/* <Link to="/login"  className="navbar-item">
                      <strong>Log in</strong>
                    </Link> */}
                    <a onClick={() => setIsActive(!isActive)} className="navbar-item">
                      <strong>Log in</strong>
                    </a>
                    { isActive === true &&
                      <div className="modal is-active">
                        <div className="modal-background" onClick={() => setIsActive(!isActive)}></div>
                        <div className="modal-content">
                          <Login 
                            setIsActive={setIsActive}
                            isActive={isActive}
                          />
                        </div>
                      </div>
                    }
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