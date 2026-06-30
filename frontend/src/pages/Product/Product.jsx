import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import { Link } from 'react-router-dom'
import FAQSection from '../../components/Sections/FAQSection'
import NewsletterSection from '../../components/Sections/NewsletterSection'

const Product = () => {
  return (
    <>
      <InnerBanner title="Our Products" breadcrumbs={[{ label: 'Products' }]} />
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">SOLUTIONS</span>
            <h2 className="display-6 fw-bold">Everything You Need To Manage Your Finances</h2>
            <p className="lead text-muted mt-3">Comprehensive banking solutions designed for modern life.</p>
          </div>
          
          <div className="row gy-4 mb-5 pb-5 border-bottom">
            <div className="col-lg-4 col-md-6">
              <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100 border hover-shadow transition-all">
                <div className="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{width: '80px', height: '80px'}}>
                  <span className="fs-1">🏦</span>
                </div>
                <h4 className="mb-3 fw-bold">Deposit Accounts</h4>
                <p className="text-muted mb-4">High yield savings and flexible checking accounts tailored to your daily needs.</p>
                <Link to="/account" className="btn btn-outline-primary fw-bold px-4 rounded-pill">Explore Accounts</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100 border hover-shadow transition-all">
                <div className="bg-success bg-opacity-10 text-success d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{width: '80px', height: '80px'}}>
                  <span className="fs-1">💳</span>
                </div>
                <h4 className="mb-3 fw-bold">Credit Cards</h4>
                <p className="text-muted mb-4">Cards that reward your lifestyle with cashback, miles, and exclusive global perks.</p>
                <Link to="/cards" className="btn btn-outline-success fw-bold px-4 rounded-pill">Explore Cards</Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="bg-white p-4 rounded-4 shadow-sm text-center h-100 border hover-shadow transition-all">
                <div className="bg-warning bg-opacity-10 text-warning d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{width: '80px', height: '80px'}}>
                  <span className="fs-1">🏠</span>
                </div>
                <h4 className="mb-3 fw-bold">Home Loans</h4>
                <p className="text-muted mb-4">Competitive rates and fast processing to help you buy your dream home faster.</p>
                <Link to="/loans/home" className="btn btn-outline-warning text-dark fw-bold px-4 rounded-pill">Explore Loans</Link>
              </div>
            </div>
          </div>

          <div className="row align-items-center gy-5 mt-4">
            <div className="col-lg-6 order-2 order-lg-1">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">DIGITAL BANKING</span>
              <h2 className="display-6 fw-bold mb-4">Bank Anytime, Anywhere with Our Mobile App.</h2>
              <p className="lead text-muted mb-4">Experience the ultimate convenience with the Bankio mobile application. Available on iOS and Android.</p>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-5">
                <li className="d-flex align-items-center gap-3"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span className="fw-medium">Instant Peer-to-Peer Transfers</span></li>
                <li className="d-flex align-items-center gap-3"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span className="fw-medium">Real-time Transaction Alerts</span></li>
                <li className="d-flex align-items-center gap-3"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span className="fw-medium">Mobile Check Deposit</span></li>
              </ul>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="text-center">
                <img src="/assets/images/mobile_banking_app.png" alt="Mobile Banking App" className="img-fluid rounded-4 shadow-lg" style={{ maxHeight: '600px' }} />
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

export default Product
