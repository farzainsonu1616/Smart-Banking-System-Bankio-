import React from 'react'
import { Link } from 'react-router-dom'

const SolutionCard = ({ title, description, link, image }) => {
  return (
    <div className="solution-card h-100 position-relative overflow-hidden rounded-4">
      <img src={image} alt={title} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
      <div className="position-relative z-1 p-4 h-100 d-flex flex-column justify-content-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
        <h3 className="text-white mb-2">{title}</h3>
        <p className="text-white-50 mb-3">{description}</p>
        <Link to={link} className="btn btn-primary align-self-start">Explore</Link>
      </div>
    </div>
  )
}

export default SolutionCard
