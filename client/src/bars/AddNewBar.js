import axios from 'axios'
import React, { useState } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth'
import AddNewBarForm from './AddNewBarForm'

const AddNewBar = ({ isActive ,setIsActive }) => {

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    fb_link: '',
    twitter_link: '',
    instagram_link: '',
    tags: '',
  })
  console.log(formData)

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await axios.post(
      '/api/bars/',
      formData,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
    )
    window.location.reload()
  }





  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <AddNewBarForm
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

export default AddNewBar
