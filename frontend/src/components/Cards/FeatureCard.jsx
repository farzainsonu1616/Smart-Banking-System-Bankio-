import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="single-box text-center h-100">
      <div className="icon mb-4 d-flex justify-content-center">
        <img src={icon} alt={title} className="img-fluid" style={{ maxHeight: '60px' }} />
      </div>
      <h4 className="mb-3">{title}</h4>
      <p className="mb-4 text-muted">{description}</p>
      {link && (
        <Link to={link} className="fw-bold text-primary d-flex align-items-center justify-content-center gap-2">
          Learn More <FiArrowRight />
        </Link>
      )}
    </div>
  )
}

export default FeatureCard
