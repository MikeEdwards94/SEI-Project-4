import React from 'react'

const CommentForm = ( { handleChange, handleSubmit, formData } ) => {
  return (
    <div className="media-content">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <label className="label white-text">Tell us your opinion</label>
            <textarea
              className="textarea"
              placeholder="Add your review here.."
              name="text"
              value={formData.text}
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

export default CommentForm
