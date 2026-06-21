import React from 'react'

const FAQSection = () => {
  const faqs = [
    { id: 1, question: "How do I open an account?", answer: "You can open an account online in just 5 minutes! Simply click 'Register' at the top of the page, provide your basic details, and complete the digital KYC process." },
    { id: 2, question: "What are the fees for international transfers?", answer: "We pride ourselves on transparency. International transfers have a flat fee of $5 plus a competitive 0.5% exchange rate margin." },
    { id: 3, question: "Is my money safe?", answer: "Absolutely. We are fully insured and regulated by the central banking authority. We utilize bank-grade 256-bit encryption to secure your transactions." },
    { id: 4, question: "How quickly can I get a loan approved?", answer: "Personal loans under $10,000 are typically auto-approved within 24 hours. Larger loans and mortgages take 3-5 business days." }
  ]

  return (
    <section className="py-5 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span className="text-primary fw-bold text-uppercase tracking-wider">Help Center</span>
            <h2 className="display-5 fw-bold mt-2 mb-3">Frequently Asked Questions</h2>
            <p className="lead text-muted">Find quick answers to common questions about our banking services.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item border-0 mb-3 rounded shadow-sm" key={faq.id}>
                  <h2 className="accordion-header">
                    <button className={`accordion-button fw-bold py-4 ${index !== 0 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${faq.id}`}>
                      {faq.question}
                    </button>
                  </h2>
                  <div id={`collapse${faq.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted pb-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
