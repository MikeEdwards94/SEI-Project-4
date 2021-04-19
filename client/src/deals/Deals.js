import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Deal from './Deal'

const Deals = () => {

  const [deals, setDeals] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('api/deals/')
      setDeals(data)
    }
    getData()
  }, [])





  return (
    <div className="index-screen-deals">
      <div className="section title-section">
        <h1 h1 className="title is-1 has-text-centered index-title white-text">Hot local deals in your area</h1>
      </div>
        
      <div className="index-container">
        <h2 className="title is-2 has-text-centered index-title white-text">Monday</h2>
        <div className='flex-deal'>
          { deals.map( deal => (
            deal.day_of_the_week === 'Monday'
              ? <Deal deal={deal}/>
              :
              null
          ))}
        </div>
        <br/>
        <br/>

        <h2 className="title is-2 has-text-centered index-title white-text">Tuesday</h2>
        <div className='flex-deal'>
          { deals.map( deal => (
            deal.day_of_the_week === 'Tuesday'
              ? <Deal deal={deal}/>
              :
              null
          ))}
        </div>
        <br/>
        <br/>

        <h2 className="title is-2 has-text-centered index-title white-text">Wednesday</h2>
        { deals.map( deal => (
          deal.day_of_the_week === 'Wednesday'
            ? <Deal deal={deal}/>
            :
            null
        ))}
        <br/>
        <br/>
        
        <h2 className="title is-2 has-text-centered index-title white-text">Thursday</h2>
        { deals.map( deal => (
          deal.day_of_the_week === 'Thursday'
            ? <Deal deal={deal}/>
            :
            null
        ))}
        <br/>
        <br/>
        
        <h2 className="title is-2 has-text-centered index-title white-text">Friday</h2>
        { deals.map( deal => (
          deal.day_of_the_week === 'Friday'
            ? <Deal deal={deal}/>
            :
            null
        ))}
        <br/>
        <br/>
        
        <h2 className="title is-2 has-text-centered index-title white-text">Saturday</h2>
        { deals.map( deal => (
          deal.day_of_the_week === 'Saturday'
            ? <Deal deal={deal}/>
            :
            null
        ))}
        <br/>
        <br/>
        
        <h2 className="title is-2 has-text-centered index-title white-text">Sunday</h2>
        { deals.map( deal => (
          deal.day_of_the_week === 'Sunday'
            ? <Deal deal={deal}/>
            :
            null
        ))}

      </div>
    </div>
  )
}

export default Deals
