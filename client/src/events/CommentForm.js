import React from 'react'

const CommentForm = ( { handleChange, handleSubmit, formData } ) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="column is-half is-offset-one-quarter box">
        <div className="field">
          <label className="label">Review</label>
          <textarea
            className="input"
            placeholder="Add your review here.."
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <button type="submit" className="button is-warning is-fullwidth">
      Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
