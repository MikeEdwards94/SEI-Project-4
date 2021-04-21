import axios from 'axios'
import React, { useState } from 'react'
import DealForm from './DealForm'
import { getTokenFromLocalStorage } from '../helpers/auth'





const AddDealForm = ({ isActive ,setIsActive }) => {


  const url = window.location.href
  const last = url.substr(url.length - 1)

  const [formData, setFormData] = useState({
    day_of_the_week: '',
    description: '',
    bar: `${last}`,
  })


  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await axios.post(
      '/api/deals/',
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
          <DealForm 
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

export default AddDealForm
