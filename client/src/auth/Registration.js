import React, { useState } from 'react'
import axios from 'axios'

const Registration = ({ regIsActive, setRegIsActive }) => {

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
  console.log(formData)

  const handleChange = event => {
    console.log(event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('api/auth/register/', formData)
      console.log(response)
      window.location.reload()
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }



  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <form className="column is-half is-offset-one-quarter box" onSubmit={handleSubmit}>
              <button className="delete delete-button" onClick={() => setRegIsActive(!regIsActive)}></button>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    placeholder="First Name"
                    name="first_name"
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
                    name="last_name"
                    value={formData.last_name}
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
                <label className="label">Profile Image</label>
                <div className="control">
                  <input
                    placeholder="Profile Image"
                    name="profile_image"
                    value={formData.profile_image}
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
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" />
                      I agree to the <a href="#">terms and conditions</a>
                  </label>
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
