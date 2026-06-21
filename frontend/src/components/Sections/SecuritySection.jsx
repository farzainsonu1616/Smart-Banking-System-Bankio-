import React from 'react'
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi'

const SecuritySection = () => {
  return (
    <section className="py-5" style={{ background: 'linear-gradient(135deg, #1e3a8a, #312e81)', color: 'white' }}>
      <div className="container py-5">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <span className="badge bg-white text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">BANK-GRADE SECURITY</span>
            <h2 className="display-5 fw-bold mb-4 text-white">Your Security is Our Top Priority</h2>
            <p className="lead mb-4 text-white-50">We employ state-of-the-art security measures to ensure your funds and personal information are protected around the clock.</p>
            
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-3">
                <div className="bg-primary bg-opacity-25 p-2 rounded text-white fs-4"><FiLock /></div>
                <div>
                  <h5 className="mb-1 text-white fw-bold">256-bit Encryption</h5>
                  <p className="text-white-50 small mb-0">All data transmitted is encrypted using military-grade standards.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="bg-success bg-opacity-25 p-2 rounded text-white fs-4"><FiShield /></div>
                <div>
                  <h5 className="mb-1 text-white fw-bold">Fraud Protection</h5>
                  <p className="text-white-50 small mb-0">24/7 automated monitoring to detect and prevent unauthorized activity.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="bg-info bg-opacity-25 p-2 rounded text-white fs-4"><FiCheckCircle /></div>
                <div>
                  <h5 className="mb-1 text-white fw-bold">Two-Factor Authentication</h5>
                  <p className="text-white-50 small mb-0">An extra layer of security required for all sensitive transactions.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 text-center">
            <div className="p-4 rounded-circle bg-white bg-opacity-10 d-inline-block shadow-lg" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
              <FiShield size={180} className="text-white opacity-75" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection
