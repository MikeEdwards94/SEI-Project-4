import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth'
import { useParams } from 'react-router'
import EditEventUserForm from './EditBarUserForm'

const EditEventForm = ({ editIsActive, setEditIsActive }) => {

  const params = useParams()

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
    fb_link: '',
    twitter_link: '',
    instagram_link: '',
    tags: '',
  })
  console.log(errors)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/events/${params.id}`)
      setFormData(data)
    }
    getData()
  }, [])

  const handleChange = event => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.put(
        `/api/events/${params.id}/`,
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      window.location.reload()
    } catch (err) {
      console.log('ERRORS', err.response)
      setErrors(err.response.data)
    }
  }

  console.log(formData)
  console.log(params.id)

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <EditEventUserForm
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            formData={formData}
            setEditIsActive={setEditIsActive}
            editIsActive={editIsActive}
          />
        </div>
      </div>
    </section>
  )
}

export default EditEventForm
