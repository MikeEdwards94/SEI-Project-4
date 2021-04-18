import axios from 'axios'
import React, { useState } from 'react'
import CommentForm from './CommentForm'
import { getTokenFromLocalStorage } from '../helpers/auth'
 

const AddCommentForm = ({ event }) => {


  const url = window.location.href
  const last = url.substr(url.length - 1)
  console.log(last)

  const [formData, setFormData] = useState({
    text: '',
    event: `${last}`,
  })


  console.log(event)

  console.log(formData)

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await axios.post(
      '/api/eventreviews/',
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
          <CommentForm 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            formData={formData}
          />
        </div>
      </div>
    </section>
  )
}

export default AddCommentForm
