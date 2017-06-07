import React from 'react'
import './shared.css'

const Open = () => {
  return (
    <div className="Status Open">
      <div className="emoji-header"><span role="img" aria-label="swim">🏊</span></div>
      <h1>No</h1>
      <p className="disclaimer">Note: This assumes 24 hour cleaning time and may not be 100% accurate.</p>
    </div>
  )
}

export default Open
