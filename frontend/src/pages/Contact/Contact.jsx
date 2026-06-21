import React, { useState } from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import ContactService from '../../services/ContactService'
import { toast } from 'react-toastify'
import FAQSection from '../../components/Sections/FAQSection'
import NewsletterSection from '../../components/Sections/NewsletterSection'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await ContactService.submitContact(formData)
      toast.success('Your message has been sent successfully!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <InnerBanner title="Contact Us" breadcrumbs={[{ label: 'Contact Us' }]} />
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="row gy-5 align-items-center mb-5 pb-5 border-bottom">
            <div className="col-lg-6">
              <img src="/assets/images/customer_support.png" alt="Customer Support" className="img-fluid rounded-4 shadow-lg" />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">24/7 SUPPORT</span>
              <h2 className="display-6 fw-bold mb-4">Dedicated Customer Care.</h2>
              <p className="lead text-muted mb-4">Our award-winning support team is available around the clock to assist you with any banking queries or technical issues.</p>
              
              <div className="d-flex flex-column gap-4 mt-5">
                <div className="d-flex align-items-center gap-4 bg-white p-3 rounded-4 shadow-sm">
                  <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow-sm" style={{width: '60px', height: '60px'}}>📍</div>
                  <div><h5 className="mb-1 fw-bold">Office Address</h5><p className="mb-0 text-muted">123 Banking Street, Financial District, Mumbai, India</p></div>
                </div>
                <div className="d-flex align-items-center gap-4 bg-white p-3 rounded-4 shadow-sm">
                  <div className="bg-success text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow-sm" style={{width: '60px', height: '60px'}}>📞</div>
                  <div><h5 className="mb-1 fw-bold">Phone Number</h5><p className="mb-0 text-muted">+91 98765 43210 (Toll Free)</p></div>
                </div>
                <div className="d-flex align-items-center gap-4 bg-white p-3 rounded-4 shadow-sm">
                  <div className="bg-warning text-dark d-flex align-items-center justify-content-center rounded-circle fs-4 shadow-sm" style={{width: '60px', height: '60px'}}>✉️</div>
                  <div><h5 className="mb-1 fw-bold">Email Address</h5><p className="mb-0 text-muted">support@smartbanking.com</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-5 pt-5">
            <div className="col-lg-8 text-center mb-5">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">MESSAGE US</span>
              <h2 className="display-6 fw-bold">Send Us A Message</h2>
              <p className="lead text-muted">Have a specific inquiry? Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>
            
            <div className="col-lg-8">
              <div className="contact-form bg-white p-5 rounded-4 shadow-lg border-top border-primary border-5">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Your Name</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email Address</label>
                      <input type="email" className="form-control form-control-lg bg-light border-0" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Subject</label>
                      <input type="text" className="form-control form-control-lg bg-light border-0" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">Your Message</label>
                      <textarea className="form-control form-control-lg bg-light border-0" name="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Type your message here..."></textarea>
                    </div>
                    <div className="col-12 mt-5">
                      <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow" disabled={loading}>
                        {loading ? 'Sending Message...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <NewsletterSection />
    </>
  )
}

export default Contact
