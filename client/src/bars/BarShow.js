import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const BarShow = () => {

  const params = useParams()

  const [bar, setBar] = useState([])

  console.log(bar)

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/bars/${params.id}`)
      setBar(data)
    }
    getData()
  }, [])







  return (
    <div>
      <p>Indvidual Bar Page</p>
      <h1 h1 className="title is-3">{bar.name}</h1>
      <p>{bar.tags}</p>
      <img src={bar.image} />
      <p>{bar.description}</p>
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      <FontAwesomeIcon icon="check-square" />


      <p></p>
      <p></p>
      <p></p>
      <p></p>

    </div>
  )
}

export default BarShow