import React, { useState } from 'react'
import axios from 'axios'

const Registration = () => {

  // const [errors, setErrors] = useState({
  //   username: '',
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   profile_image: '',
  //   password: '',
  //   password_confirmation: '',
  // })

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })
  console.log(formData, setFormData)

  const handleChange = event => {
    console.log(event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.taret.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('api/auth/register', formData)
      console.log(response)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }



  return (
    <div>
      <p>Register page</p>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form className="column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    placeholder="First Name"
                    name="firstName"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <button type="submit" className="button is-fullwidth is-warning">Register Me!</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Registration
