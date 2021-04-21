import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ isActive, setIsActive }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await axios.post('api/auth/login/', formData)
    window.localStorage.setItem('token', response.data.token)
    window.location.reload()
  }

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }


  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form onSubmit={handleSubmit} className="box column is-half is-offset-one-quarter">
            <button className="delete delete-button" onClick={() => setIsActive(!isActive)}></button>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-fullwidth is-warning">Log Me In!</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login