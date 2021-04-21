import React from 'react'

const AddNewBarForm = ({ handleChange, handleSubmit, formData, setIsActive, isActive }) => {
  return (
    <div className="media-content">
      <form onSubmit={handleSubmit}>
        <button className="delete delete-button" onClick={() => setIsActive(!isActive)}></button>
        <div className="field">
          <label className="label white-text">Fill in the details below to add in your bar</label>

          <div className="control">
            <input
              className="input"
              placeholder="Bar name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
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

export default AddNewBarForm
