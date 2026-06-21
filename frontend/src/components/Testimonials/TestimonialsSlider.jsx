import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const TestimonialsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  const testimonials = [
    {
      id: 1,
      name: "Sonia Sharma",
      role: "Business Owner",
      text: "Smart Banking has completely transformed how I manage my business finances. Their mobile app is incredibly intuitive.",
      image: "/assets/images/user-1.png"
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "Software Engineer",
      text: "The personal loan process was so fast and completely paperless. I had the funds in my account within 24 hours.",
      image: "/assets/images/user-2.png"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Freelancer",
      text: "I love the zero-fee international remittance. It saves me so much money when receiving payments from clients abroad.",
      image: "/assets/images/user-3.png"
    }
  ]

  return (
    <div className="testimonials-slider-wrap pb-5">
      <Slider {...settings}>
        {testimonials.map(t => (
          <div key={t.id} className="p-3">
            <div className="bg-white p-4 rounded-4 shadow-sm h-100">
              <div className="text-warning mb-3">★★★★★</div>
              <p className="fs-5 fst-italic text-muted mb-4">"{t.text}"</p>
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', overflow: 'hidden' }}>
                  {t.image ? <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} /> : <div className="fw-bold text-primary">{t.name.charAt(0)}</div>}
                </div>
                <div>
                  <h5 className="mb-0">{t.name}</h5>
                  <span className="text-muted fs-6">{t.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialsSlider
