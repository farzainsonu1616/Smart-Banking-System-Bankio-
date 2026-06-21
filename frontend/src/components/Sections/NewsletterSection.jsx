import React from 'react'
import { FiMail } from 'react-icons/fi'
import { toast } from 'react-toastify'

const NewsletterSection = () => {
  const handleSubscribe = (e) => {
    e.preventDefault()
    toast.success('Successfully subscribed to the newsletter!')
    e.target.reset()
  }

  return (
    <section className="py-5 bg-primary text-white position-relative overflow-hidden">
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'url(/assets/images/pattern.png) center/cover', opacity: 0.1 }}></div>
      <div className="container py-5 position-relative z-1">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="d-inline-block bg-white bg-opacity-10 rounded-circle p-3 mb-4">
              <FiMail size={40} className="text-white" />
            </div>
            <h2 className="display-6 fw-bold mb-3 text-white">Subscribe to Our Newsletter</h2>
            <p className="lead text-white-50 mb-5">Stay updated with the latest financial news, banking tips, and exclusive offers delivered straight to your inbox.</p>
            
            <form className="d-flex justify-content-center gap-2 max-w-lg mx-auto" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                className="form-control form-control-lg border-0 px-4" 
                placeholder="Enter your email address" 
                required 
                style={{ maxWidth: '400px' }}
              />
              <button type="submit" className="btn btn-dark btn-lg px-4 fw-bold">Subscribe</button>
            </form>
            <p className="small text-white-50 mt-3 mb-0">We respect your privacy. No spam ever.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
