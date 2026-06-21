import React, { useState } from 'react'
import { FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Support = () => {
  const [formData, setFormData] = useState({ subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.subject || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success('Support ticket submitted successfully! We will contact you soon.')
    setFormData({ subject: '', message: '' })
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-0 text-white" style={{ fontWeight: '700' }}>Customer Support</h4>
          <p className="text-light opacity-75">We're here to help. Contact us using the form below or through our support channels.</p>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-lg-4">
          <div className="card border-0 mb-4 h-100" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
            <div className="card-body p-4 text-white">
              <h5 className="mb-4">Contact Information</h5>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-25 p-3 rounded-circle me-3">
                  <FiPhone size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="mb-1">Phone Support</h6>
                  <p className="mb-0 opacity-75">+1 800 123 4567</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-success bg-opacity-25 p-3 rounded-circle me-3">
                  <FiMail size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="mb-1">Email Support</h6>
                  <p className="mb-0 opacity-75">support@bankio.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-25 p-3 rounded-circle me-3">
                  <FiMessageSquare size={24} className="text-warning" />
                </div>
                <div>
                  <h6 className="mb-1">Live Chat</h6>
                  <p className="mb-0 opacity-75">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 h-100" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', borderRadius: '16px' }}>
            <div className="card-body p-4 text-white">
              <h5 className="mb-4">Create a Ticket</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-light opacity-75">Subject</label>
                  <input 
                    type="text" 
                    className="form-control bg-dark border-secondary text-white" 
                    placeholder="Enter issue subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-light opacity-75">Message</label>
                  <textarea 
                    className="form-control bg-dark border-secondary text-white" 
                    rows="5" 
                    placeholder="Describe your issue in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary px-4 py-2" style={{ borderRadius: '8px' }}>
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
