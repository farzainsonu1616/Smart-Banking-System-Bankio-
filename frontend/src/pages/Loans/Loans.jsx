import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import LoanCalculator from '../../components/LoanCards/LoanCalculator'
import FAQSection from '../../components/Sections/FAQSection'
import NewsletterSection from '../../components/Sections/NewsletterSection'

const Loans = () => {
  return (
    <>
      <InnerBanner title="Our Loan Products" breadcrumbs={[{ label: 'Loans' }]} />
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="row gy-5 align-items-center mb-5 pb-5 border-bottom">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2 rounded-pill fw-bold tracking-wider">FAST & EASY</span>
              <h2 className="display-6 fw-bold mb-4">Fulfill Your Dreams With Our Loans</h2>
              <p className="lead text-muted mb-4">Whether it's a medical emergency, a dream wedding, buying a home, or starting a business, our instant loans provide you with the funds you need quickly and securely.</p>
              
              <ul className="list-unstyled list mb-5">
                <li className="mb-3 d-flex gap-3 align-items-center"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span><strong>Low Interest Rates:</strong> Highly competitive rates across all loan types.</span></li>
                <li className="mb-3 d-flex gap-3 align-items-center"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span><strong>High Loan Amount:</strong> Borrow what you need with tailored limits.</span></li>
                <li className="mb-3 d-flex gap-3 align-items-center"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span><strong>Flexible Tenure:</strong> Choose a repayment period that suits your financial plan.</span></li>
                <li className="mb-3 d-flex gap-3 align-items-center"><div className="bg-success text-white rounded-circle p-1"><i className="bi bi-check"></i></div> <span><strong>Instant Approval:</strong> 100% digital application process with minimum documentation.</span></li>
              </ul>
              
              <a href="/login" className="btn btn-primary btn-lg fw-bold px-5 rounded-pill shadow-sm">Apply Now</a>
            </div>
            
            <div className="col-lg-6">
              <div className="bg-white p-5 rounded-4 shadow-lg border">
                <h3 className="mb-4 text-center fw-bold">EMI Calculator</h3>
                <p className="text-center text-muted mb-5">Estimate your monthly payments instantly.</p>
                <LoanCalculator maxAmount={1000000} rate={10.5} />
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

export default Loans
