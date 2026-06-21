import React from 'react'
import InnerBanner from '../../components/Hero/InnerBanner'
import FAQAccordion from '../../components/FAQ/FAQAccordion'

const FAQ = () => {
  const generalFaqs = [
    { question: "How do I open an account?", answer: "Opening an account is simple and fully digital. Click on 'Sign Up', fill out the required details, verify your identity using the OTP sent to your email, and your account will be activated instantly." },
    { question: "Is my money safe with Smart Banking?", answer: "Absolutely. We employ military-grade 256-bit encryption to protect all your data and transactions. Additionally, all deposits are insured up to ₹5,00,000 by the Deposit Insurance and Credit Guarantee Corporation (DICGC)." },
    { question: "Are there any hidden fees?", answer: "No, we believe in complete transparency. Our standard savings and checking accounts have zero maintenance fees. Any charges for premium services or international transactions are clearly listed on our pricing page." },
    { question: "How can I reset my password?", answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we will send you an OTP. Enter the OTP along with your new password to reset it securely." }
  ]

  return (
    <>
      <InnerBanner title="Frequently Asked Questions" breadcrumbs={[{ label: 'FAQs' }]} />
      <section className="pt-120 pb-120 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-header text-center mb-5">
                <span className="sub-title">HAVE QUESTIONS?</span>
                <h2 className="title">General Questions</h2>
              </div>
              <FAQAccordion faqs={generalFaqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
