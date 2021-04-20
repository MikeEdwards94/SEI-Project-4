import axios from 'axios'
import React, { useState } from 'react'
import CommentForm from '../commentform/CommentForm'
import { getTokenFromLocalStorage } from '../helpers/auth'
 

const AddCommentForm = () => {


  const url = window.location.href
  const last = url.substr(url.length - 1)

  const [formData, setFormData] = useState({
    text: '',
    bar: `${last}`,
  })
  console.log(formData)

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await axios.post(
      '/api/barreviews/',
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
