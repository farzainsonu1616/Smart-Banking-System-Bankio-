import React from 'react'
import { FiStar } from 'react-icons/fi'

const Testimonials = () => {
  const reviews = [
    { id: 1, name: "Sarah Jenkins", role: "Small Business Owner", text: "Smart Banking transformed how I handle my business finances. The loan process was incredibly fast and transparent.", rating: 5 },
    { id: 2, name: "Michael Chang", role: "Software Engineer", text: "The mobile app is flawless. I can track my spending, transfer funds instantly, and the security features give me peace of mind.", rating: 5 },
    { id: 3, name: "Emily Robinson", role: "Freelancer", text: "I've saved so much on international transfer fees. The customer support team is also amazingly responsive whenever I need help.", rating: 4 }
  ]

  return (
    <section className="py-5 bg-white">
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="text-primary fw-bold text-uppercase tracking-wider">Testimonials</span>
            <h2 className="display-5 fw-bold mt-2 mb-3">Loved by Our Customers</h2>
            <p className="lead text-muted">Don't just take our word for it. Here's what our users have to say.</p>
          </div>
        </div>
        <div className="row gy-4">
          {reviews.map(review => (
            <div className="col-lg-4 col-md-6" key={review.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-light hover-shadow transition-all">
                <div className="d-flex text-warning mb-3">
                  {[...Array(review.rating)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                </div>
                <p className="fst-italic text-muted mb-4">"{review.text}"</p>
                <div className="mt-auto d-flex align-items-center gap-3 border-top pt-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                    <span className="fw-bold fs-5">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{review.name}</h6>
                    <small className="text-muted">{review.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
