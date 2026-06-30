import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import FeatureCard from '../../components/Cards/FeatureCard'
import SolutionCard from '../../components/Cards/SolutionCard'
import TestimonialsSlider from '../../components/Testimonials/TestimonialsSlider'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiSmartphone, FiShield, FiTrendingUp, FiGlobe, FiUsers, FiAward, FiStar, FiZap } from 'react-icons/fi'

const Home = () => {
  return (
    <div className="home-wrapper" style={{ background: 'linear-gradient(180deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)', overflow: 'hidden' }}>
      <style>{`
        .home-wrapper .banner-section {
          background: transparent !important;
          min-height: 100vh;
          position: relative;
        }
        .home-wrapper section:not(.app-download) {
          background: transparent !important;
        }
        /* Fix the white background on the banner image */
        .banner-img img {
          mix-blend-mode: multiply;
        }
        /* Floating Shapes for Aesthetics */
        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          z-index: 0;
          opacity: 0.6;
        }
        .shape-1 { width: 300px; height: 300px; background: #3b82f6; top: -100px; left: -100px; animation: float 6s ease-in-out infinite; }
        .shape-2 { width: 400px; height: 400px; background: #8b5cf6; bottom: 10%; right: -150px; animation: float 8s ease-in-out infinite reverse; }
        .shape-3 { width: 200px; height: 200px; background: #06b6d4; top: 40%; left: 30%; animation: float 7s ease-in-out infinite; opacity: 0.4; }
        
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        
        .floating-icon {
          position: absolute;
          background: white;
          padding: 15px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: float 5s ease-in-out infinite;
        }
        .floating-icon.top { top: 20%; right: 40%; animation-delay: 1s; }
        .floating-icon.bottom { bottom: 25%; left: -20px; animation-delay: 2s; }
        
        .cmn-btn.primary-gradient {
          background: linear-gradient(45deg, #3b82f6, #2563eb);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4);
        }
        
        /* Make cards look good on the continuous blue background */
        .home-wrapper .single-box, .home-wrapper .stat-item, .home-wrapper .get-content, .home-wrapper .cta-section .row {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.5);
        }
        
        .solution-card:hover .solution-img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content animate-fadeInUp pe-lg-5">


                <h1 className="title mb-4" style={{ fontSize: '65px', fontWeight: '900', lineHeight: '1.1', color: '#0f172a' }}>
                  Banking Solutions That <br/><span className="text-primary" style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fit Your Life.</span>
                </h1>
                <p className="mb-5 fs-5 text-muted fw-medium" style={{ lineHeight: '1.8' }}>Experience the next generation of online banking with Bankio. Fast transactions, better rates, and absolute security built for the modern world.</p>
                <div className="d-flex flex-wrap gap-4 align-items-center">
                  <Link to="/register" className="cmn-btn primary-gradient px-5 py-3 fs-5 rounded-pill">Open Account <FiArrowRight className="ms-2" /></Link>
                  <Link to="/about" className="text-dark fw-bold text-decoration-none hover-lift d-flex align-items-center gap-2 fs-5">
                    <div className="bg-white p-3 rounded-circle shadow-sm text-primary"><FiZap /></div>
                    See How It Works
                  </Link>
                </div>
                
                {/* Trust Indicators in Banner */}
                <div className="mt-5 pt-4 d-flex align-items-center gap-5 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success"><FiShield className="fs-3" /></div>
                    <div>
                      <h6 className="mb-0 fw-bold fs-5 text-dark">Fully Secure</h6>
                      <small className="text-muted fw-medium">Bank-grade encryption</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning"><FiAward className="fs-3" /></div>
                    <div>
                      <h6 className="mb-0 fw-bold fs-5 text-dark">Award Winning</h6>
                      <small className="text-muted fw-medium">Best Digital Bank 2025</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block position-relative">
              <div className="banner-img text-end animate-fadeInUp position-relative" style={{ animationDelay: '0.2s', zIndex: 1 }}>
                
                <div className="floating-icon top">
                  <div className="bg-primary-light text-primary p-2 rounded-circle"><FiGlobe /></div>
                  <div>
                    <small className="d-block fw-bold text-dark lh-1">Global</small>
                    <small className="text-muted" style={{fontSize: '11px'}}>Transfers</small>
                  </div>
                </div>
                
                <div className="floating-icon bottom">
                  <div className="bg-success text-white p-2 rounded-circle"><FiTrendingUp /></div>
                  <div>
                    <small className="d-block fw-bold text-dark lh-1">+14.5%</small>
                    <small className="text-muted" style={{fontSize: '11px'}}>High Yield</small>
                  </div>
                </div>

                <img src="/assets/images/banner-img.png" alt="Bankio" className="img-fluid drop-shadow-2xl hover-lift" style={{ transform: 'scale(1.1)', transformOrigin: 'center right' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row text-center gy-4 justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="stat-item p-4 rounded-4 shadow-sm hover-lift">
                <div className="fs-1 text-primary mb-3"><FiUsers /></div>
                <h2 className="fw-bolder mb-1" style={{ fontSize: '40px' }}>2M+</h2>
                <p className="text-muted fw-semibold mb-0">Active Users</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="stat-item p-4 rounded-4 shadow-sm hover-lift">
                <div className="fs-1 text-primary mb-3"><FiGlobe /></div>
                <h2 className="fw-bolder mb-1" style={{ fontSize: '40px' }}>150+</h2>
                <p className="text-muted fw-semibold mb-0">Countries Supported</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="stat-item p-4 rounded-4 shadow-sm hover-lift">
                <div className="fs-1 text-primary mb-3"><FiTrendingUp /></div>
                <h2 className="fw-bolder mb-1" style={{ fontSize: '40px' }}>$10B+</h2>
                <p className="text-muted fw-semibold mb-0">Transactions Processed</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="stat-item p-4 rounded-4 shadow-sm hover-lift">
                <div className="fs-1 text-primary mb-3"><FiShield /></div>
                <h2 className="fw-bolder mb-1" style={{ fontSize: '40px' }}>0%</h2>
                <p className="text-muted fw-semibold mb-0">Security Breaches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-120 pb-120">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="sub-title d-inline-block px-3 py-1 rounded-pill bg-white text-primary fw-bold shadow-sm mb-3">WHY CHOOSE US</span>
            <h2 className="title" style={{ fontSize: '48px', fontWeight: '800' }}>Bankio Features</h2>
            <p className="text-muted mt-3 mx-auto fs-5" style={{ maxWidth: '700px' }}>Discover the tools and features designed to give you total control over your financial life, securely and effortlessly.</p>
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
            <span className="sub-title d-inline-block px-3 py-1 rounded-pill bg-white text-primary fw-bold shadow-sm mb-3">OUR PRODUCTS</span>
            <h2 className="title" style={{ fontSize: '48px', fontWeight: '800' }}>Financial Solutions For You</h2>
            <p className="text-muted mt-3 mx-auto fs-5" style={{ maxWidth: '700px' }}>Whether you're saving for the future or growing your business, we have the right financial tools for you.</p>
          </div>
          <div className="row gy-4">
            <div className="col-lg-6">
              <SolutionCard 
                title="Personal Banking"
                description="Checking and savings accounts with high yield interests. Manage your daily finances with ease and zero hidden fees."
                image="/assets/images/solution-1.jpg"
                link="/products"
              />
            </div>
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-12">
                  <SolutionCard 
                    title="Business Loans"
                    description="Fuel your company's growth with our flexible business loans tailored to your needs."
                    image="/assets/images/solution-2.jpg"
                    link="/loans"
                  />
                </div>
                <div className="col-12">
                  <SolutionCard 
                    title="Credit Cards"
                    description="Rewards, cashback, and premium travel benefits designed to match your lifestyle."
                    image="/assets/images/solution-3.jpg"
                    link="/products"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Get Started */}
      <section className="get-start pt-120 pb-120">
        <div className="container">
          <div className="get-content p-5 rounded-5 shadow-lg border-0 position-relative overflow-hidden">
            <div className="shape shape-3" style={{ opacity: 0.2, top: '-50px', right: '-50px', width: '200px', height: '200px' }}></div>
            <div className="row align-items-center position-relative z-1">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <span className="sub-title d-block mb-2 text-primary fw-bold">EASY PROCESS</span>
                <h2 className="mb-4 title" style={{ fontSize: '42px', fontWeight: '800' }}>Get Started In Minutes</h2>
                <p className="mb-4 text-muted fs-5">Opening an account with Bankio is completely paperless and takes less than 5 minutes. Verify your identity online and get instant access to your new virtual card.</p>
                <ul className="list-unstyled list mb-5">
                  <li className="list-item d-flex align-items-center mb-3">
                    <div className="icon-box bg-white text-primary rounded-circle p-2 me-3 shadow-sm border">
                      <FiCheckCircle className="fs-4" />
                    </div>
                    <span className="fs-5 fw-bold text-dark">Fill the online form</span>
                  </li>
                  <li className="list-item d-flex align-items-center mb-3">
                    <div className="icon-box bg-white text-primary rounded-circle p-2 me-3 shadow-sm border">
                      <FiCheckCircle className="fs-4" />
                    </div>
                    <span className="fs-5 fw-bold text-dark">Verify your identity via OTP</span>
                  </li>
                  <li className="list-item d-flex align-items-center">
                    <div className="icon-box bg-white text-primary rounded-circle p-2 me-3 shadow-sm border">
                      <FiCheckCircle className="fs-4" />
                    </div>
                    <span className="fs-5 fw-bold text-dark">Start banking instantly</span>
                  </li>
                </ul>
                <Link to="/register" className="cmn-btn primary-gradient rounded-pill px-5">Open Account Now</Link>
              </div>
              <div className="col-lg-6 d-none d-lg-block text-center">
                <img src="/assets/images/get-start.png" alt="Get Started" className="img-fluid hover-lift" style={{ mixBlendMode: 'multiply' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="app-download pt-120 pb-120 position-relative overflow-hidden mt-5" style={{ background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)', borderRadius: '60px 60px 0 0', boxShadow: '0 -20px 50px rgba(0,0,0,0.1)' }}>
        <div className="shape shape-1" style={{ opacity: 0.2 }}></div>
        <div className="shape shape-2" style={{ opacity: 0.2 }}></div>
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
              <span className="sub-title d-inline-block px-3 py-1 rounded-pill bg-white text-primary fw-bold shadow-sm mb-3">MOBILE EXPERIENCE</span>
              <h2 className="title text-white mb-4" style={{ fontSize: '50px', fontWeight: '800' }}>Bank on the go with our App</h2>
              <p className="fs-5 mb-5 opacity-75 text-white">Manage your finances anytime, anywhere. Check balances, transfer funds, pay bills, and much more right from your smartphone.</p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <button className="btn btn-light rounded-pill px-4 py-3 d-flex align-items-center gap-3 hover-lift shadow-lg border-0">
                  <FiSmartphone className="fs-2 text-primary" />
                  <div className="text-start">
                    <small className="d-block lh-1 text-muted fw-bold">Download on the</small>
                    <span className="fs-5 fw-bolder text-dark">App Store</span>
                  </div>
                </button>
                <button className="btn btn-light rounded-pill px-4 py-3 d-flex align-items-center gap-3 hover-lift shadow-lg border-0">
                  <FiSmartphone className="fs-2 text-primary" />
                  <div className="text-start">
                    <small className="d-block lh-1 text-muted fw-bold">GET IT ON</small>
                    <span className="fs-5 fw-bolder text-dark">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
               <div className="app-mockup-wrapper position-relative d-inline-block hover-lift" style={{ transform: 'rotate(5deg)' }}>
                 <div className="bg-white rounded-5 shadow-lg p-3 mx-auto" style={{ width: '280px', height: '560px', border: '8px solid #0f172a' }}>
                    <div className="h-100 bg-light rounded-4 overflow-hidden position-relative text-start">
                      <div className="text-white p-4 pt-5 pb-5 text-center" style={{ background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)' }}>
                         <h4 className="text-white mb-1 fw-bold">$12,450.00</h4>
                         <p className="opacity-75 small mb-0 fw-bold">Total Balance</p>
                      </div>
                      <div className="p-3">
                        <div className="d-flex justify-content-between mb-4">
                           <div className="text-center"><div className="bg-white text-primary p-3 rounded-circle mb-2 shadow-sm border"><FiArrowRight /></div><small className="fw-bold">Send</small></div>
                           <div className="text-center"><div className="bg-white text-primary p-3 rounded-circle mb-2 shadow-sm border"><FiShield /></div><small className="fw-bold">Pay</small></div>
                           <div className="text-center"><div className="bg-white text-primary p-3 rounded-circle mb-2 shadow-sm border"><FiTrendingUp /></div><small className="fw-bold">Invest</small></div>
                        </div>
                        <h6 className="fw-bold mb-3 text-dark">Recent Transactions</h6>
                        <div className="d-flex justify-content-between align-items-center p-2 border-bottom mb-2 bg-white rounded-3 shadow-sm">
                           <div className="d-flex align-items-center gap-2">
                             <div className="bg-primary-light p-2 rounded text-primary"><FiGlobe /></div>
                             <div><small className="d-block fw-bold text-dark lh-1">Netflix</small><small className="text-muted fw-bold" style={{fontSize: '10px'}}>Subscription</small></div>
                           </div>
                           <small className="fw-bold text-danger">-$15.99</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-white rounded-3 shadow-sm">
                           <div className="d-flex align-items-center gap-2">
                             <div className="bg-success text-white p-2 rounded bg-opacity-75"><FiUsers /></div>
                             <div><small className="d-block fw-bold text-dark lh-1">Salary</small><small className="text-muted fw-bold" style={{fontSize: '10px'}}>Income</small></div>
                           </div>
                           <small className="fw-bold text-success">+$4,200.00</small>
                        </div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials pt-120 pb-120">
        <div className="container">
          <div className="section-header text-center mb-5">
            <span className="sub-title d-inline-block px-3 py-1 rounded-pill bg-white text-primary fw-bold shadow-sm mb-3">FEEDBACK</span>
            <h2 className="title" style={{ fontSize: '48px', fontWeight: '800' }}>What Our Customers Say</h2>
            <p className="text-muted mt-3 mx-auto fs-5" style={{ maxWidth: '700px' }}>Join millions of satisfied users who have transformed the way they bank with us.</p>
          </div>
          <TestimonialsSlider />
        </div>
      </section>
      
      {/* Call to Action Bottom */}
      <section className="cta-section pt-5 pb-5">
        <div className="container">
          <div className="row align-items-center rounded-4 p-5 shadow-lg border-0" style={{ background: 'linear-gradient(45deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' }}>
            <div className="col-lg-8 mb-4 mb-lg-0 text-center text-lg-start">
              <h3 className="fw-bold mb-2" style={{ fontSize: '36px', color: '#0f172a' }}>Ready to experience better banking?</h3>
              <p className="text-muted fs-5 mb-0 fw-medium">Open an account in minutes and take control of your financial future.</p>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <Link to="/register" className="cmn-btn primary-gradient rounded-pill px-5 py-3 fs-5">Open Free Account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
