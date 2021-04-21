import React from 'react'

const AddNewEventForm = ({ handleChange, handleSubmit, formData, editIsActive, setEditIsActive }) => {
  return (
    <div className="media-content">
      <form onSubmit={handleSubmit}>
        <button className="delete delete-button" onClick={() => setEditIsActive(!editIsActive)}></button>
        <div className="field">
          <label className="label white-text">Enter your event details</label>

          <div className="control">
            <label className="label white-text text-left">Name</label>

            <input
              className="input"
              placeholder="Event name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Link to your main image</label>

            <input
              className="input"
              placeholder="Link to your main image"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
        </div>
        

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Event Description</label>

            <input
              className="input"
              placeholder="Brief description of your bar"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Day of the week taking place</label>

            <input
              className="input"
              placeholder="Day of the week"
              name="day_of_the_week"
              value={formData.day_of_the_week}
              onChange={handleChange}
            />
          </div>
        </div>
        

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Facebook Link</label>

            <input
              className="input"
              placeholder="Link to your facebook page"
              name="fb_link"
              value={formData.fb_link}
              onChange={handleChange}
            />
          </div>
        </div>
        

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Twitter Link</label>

            <input
              className="input"
              placeholder="Link to your twitter page"
              name="twitter_link"
              value={formData.twitter_link}
              onChange={handleChange}
            />
          </div>
        </div>
        

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Instagram Link</label>

            <input
              className="input"
              placeholder="Link to your instagram page"
              name="instagram_link"
              value={formData.instagram_link}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Website</label>

            <input
              className="input"
              placeholder="Link to your Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
        </div>
        

        <div className="field">
          <div className="control">
            <label className="label white-text text-left">Tags</label>

            <input
              className="input"
              placeholder="Common tags ie. Smart-casual, Multiple Rooms, 80's music"
              name="tags"
              value={formData.tags}
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

export default AddNewEventForm
