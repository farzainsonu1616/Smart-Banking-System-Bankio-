import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import Testimonials from '../../components/Sections/Testimonials'
import SecuritySection from '../../components/Sections/SecuritySection'
import NewsletterSection from '../../components/Sections/NewsletterSection'

const About = () => {
  return (
    <>
      <InnerBanner title="About Us" breadcrumbs={[{ label: 'About Us' }]} />
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <img src="/assets/images/modern_bank_branch.png" alt="Modern Bank Branch" className="img-fluid rounded-4 shadow-lg border" />
            </div>
            <div className="col-lg-6">
              <div className="about-content ps-lg-5">
                <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">WHO WE ARE</span>
                <h2 className="display-6 fw-bold mb-4">We Are Here To Make Your Financial Life Easier.</h2>
                <p className="lead text-muted mb-4">Bankio is a leading digital banking platform designed to provide secure, fast, and transparent financial services to users worldwide.</p>
                <p className="text-muted mb-5">With over 10 years of experience in the financial tech industry, our team is dedicated to building the most robust banking infrastructure that puts customers first. We believe banking should be simple, intuitive, and most importantly, accessible to everyone.</p>
                
                <div className="row gy-4 border-top pt-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow" style={{width: '60px', height: '60px'}}>10+</div>
                      <div><h5 className="mb-0 fw-bold">Years of</h5><span className="text-muted small text-uppercase">Experience</span></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-success text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow" style={{width: '60px', height: '60px'}}>1M+</div>
                      <div><h5 className="mb-0 fw-bold">Happy</h5><span className="text-muted small text-uppercase">Customers</span></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-info text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow" style={{width: '60px', height: '60px'}}>$5B</div>
                      <div><h5 className="mb-0 fw-bold">Assets</h5><span className="text-muted small text-uppercase">Managed</span></div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-warning text-white d-flex align-items-center justify-content-center rounded-circle fs-4 shadow" style={{width: '60px', height: '60px'}}>42</div>
                      <div><h5 className="mb-0 fw-bold">Global</h5><span className="text-muted small text-uppercase">Branches</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SecuritySection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}

export default About
