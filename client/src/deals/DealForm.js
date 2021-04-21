import React from 'react'

const AddDealForm = ( { handleChange, handleSubmit, formData, setIsActive, isActive } ) => {

  return (
    <div className="media-content">
      <form onSubmit={handleSubmit}>
        <button className="delete delete-button" onClick={() => setIsActive(!isActive)}></button>
        <div className="field">
          <label className="label white-text">Add a New Weekly Deal</label>
          <div className="control">

            <input
              className="input"
              placeholder="Day of the week taking place"
              name="day_of_the_week"
              value={formData.day_of_the_week}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="input"
              placeholder="Deal description here"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <button type="submit" className="button is-danger">
      Submit
              </button>
            </div>
          </div>
        </nav>
      </form>
    </div>
  )
}

export default AddDealForm
