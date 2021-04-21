import axios from 'axios'
import React, { useState } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth'
import AddNewEventForm from './AddNewEventForm'

const AddNewEvent = ({ isActive ,setIsActive }) => {

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    day_of_the_week: '',
    website: '',
    fb_link: '',
    twitter_link: '',
    instagram_link: '',
    tags: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    description: '',
    day_of_the_week: '',
    website: '',
    fb_link: '',
    twitter_link: '',
    instagram_link: '',
    tags: '',
  })
  console.log('ERRORS', errors)
  console.log('FORMDATA', formData)

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post(
 
        '/api/events/',
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      window.location.reload()
    } catch (err) {
      console.log(err)
      setErrors(err.response.data)
    }
  }




  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <AddNewEventForm
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            formData={formData}
            setIsActive={setIsActive}
            isActive={isActive}
          />
        </div>
      </div>
    </section>
  )
}

export default AddNewEvent