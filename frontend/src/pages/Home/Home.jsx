import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import FeatureCard from '../../components/Cards/FeatureCard'
import SolutionCard from '../../components/Cards/SolutionCard'
import TestimonialsSlider from '../../components/Testimonials/TestimonialsSlider'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const Home = () => {
  return (
    <>
      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content animate-fadeInUp">
                <span className="sub-title d-block mb-2">SIMPLE. TRANSPARENT. SECURE</span>
                <h1 className="title mb-4">Banking Solutions That Fit Your Life.</h1>
                <p className="mb-5 fs-5">Experience the next generation of online banking with Smart Banking System. Fast transactions, better rates, and absolute security.</p>
                <div className="d-flex gap-3">
                  <Link to="/register" className="cmn-btn">Open Account</Link>
                  <Link to="/about" className="cmn-btn second">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="banner-img text-end animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <img src="/assets/images/banner-img.png" alt="Smart Banking" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="sub-title">WHY CHOOSE US</span>
            <h2 className="title">Smart Banking Features</h2>
          </div>
          <div className="row justify-content-center gy-4">
            <div className="col-lg-4 col-md-6">
              <FeatureCard 
                icon="/assets/images/icon/feature-1.png"
                title="Secure Payments"
                description="We use military-grade encryption to protect your sensitive financial data during every transaction."
                link="/about"
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <FeatureCard 
                icon="/assets/images/icon/feature-2.png"
                title="Global Network"
                description="Access your money from anywhere in the world with zero international transaction fees on premium accounts."
                link="/remittance"
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <FeatureCard 
                icon="/assets/images/icon/feature-3.png"
                title="24/7 Support"
                description="Our dedicated support team is available around the clock to help you with any issues or queries."
                link="/contact"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Products */}
      <section className="pt-120 pb-120">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="sub-title">OUR PRODUCTS</span>
            <h2 className="title">Financial Solutions For You</h2>
          </div>
          <div className="row gy-4">
            <div className="col-lg-6">
              <SolutionCard 
                title="Personal Banking"
                description="Checking and savings accounts with high yield interests."
                image="/assets/images/solution-1.jpg"
                link="/account"
              />
            </div>
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-12">
                  <SolutionCard 
                    title="Business Loans"
                    description="Fuel your company's growth with our flexible business loans."
                    image="/assets/images/solution-2.jpg"
                    link="/loans/business"
                  />
                </div>
                <div className="col-12">
                  <SolutionCard 
                    title="Credit Cards"
                    description="Rewards, cashback, and premium travel benefits."
                    image="/assets/images/solution-3.jpg"
                    link="/cards"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Get Started */}
      <section className="get-start pb-120">
        <div className="container">
          <div className="get-content">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-4">Get Started In Minutes</h2>
                <p className="mb-4">Opening an account with Smart Banking is completely paperless and takes less than 5 minutes. Verify your identity online and get instant access to your new virtual card.</p>
                <ul className="list-unstyled list mb-4">
                  <li className="list-item d-flex align-items-center">
                    <FiCheckCircle className="check text-accent fs-4" /> <span className="fs-5">Fill the online form</span>
                  </li>
                  <li className="list-item d-flex align-items-center">
                    <FiCheckCircle className="check text-accent fs-4" /> <span className="fs-5">Verify your identity via OTP</span>
                  </li>
                  <li className="list-item d-flex align-items-center">
                    <FiCheckCircle className="check text-accent fs-4" /> <span className="fs-5">Start banking instantly</span>
                  </li>
                </ul>
                <Link to="/register" className="cmn-btn bg-white text-primary">Open Account Now</Link>
              </div>
              <div className="col-lg-6 d-none d-lg-block text-center">
                <img src="/assets/images/get-start.png" alt="Get Started" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials pt-120 pb-120">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="sub-title">FEEDBACK</span>
            <h2 className="title">What Our Customers Say</h2>
          </div>
          <TestimonialsSlider />
        </div>
      </section>
    </>
  )
}

export default Home
