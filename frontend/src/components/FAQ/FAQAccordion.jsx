import React from 'react'

const FAQAccordion = ({ faqs }) => {
  return (
    <div className="faq-box accordion" id="faqAccordion">
      {faqs.map((faq, idx) => (
        <div className="accordion-item" key={idx}>
          <h2 className="accordion-header">
            <button 
              className={`accordion-button ${idx === 0 ? '' : 'collapsed'}`} 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target={`#faq-${idx}`}
            >
              {faq.question}
            </button>
          </h2>
          <div id={`faq-${idx}`} className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
            <div className="accordion-body">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQAccordion
