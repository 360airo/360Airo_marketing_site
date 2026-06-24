import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../styles/testimonial-carousel.css';

const testimonials = [
  {
    company: "SumUp",
    quote: "360Airo integrates valuable local business data, supporting our efforts to engage merchants in a meaningful way.",
    name: "Karlo Biuk",
    title: "Growth Lead, SumUp",
    logoText: "SumUp"
  },
  {
    company: "CookUnity",
    quote: "Before 360Airo, our team spent far too much time on cold outreach. It has significantly freed up our team's bandwidth.",
    name: "Bruno Didier",
    title: "Head of B2B, CookUnity",
    logoText: "CookUnity"
  },
  {
    company: "RAISE Summit",
    quote: "We've 20x'ed our investment in revenue. The ROI isn't just proven - it's undeniable.",
    name: "Henri Delahaye",
    title: "Founder, RAISE Summit",
    logoText: "RAISE"
  },
  {
    company: "Bioaccess",
    quote: "How Bioaccess achieved a 1.2% positive response rate with 360Airo.",
    name: "Julio Martinez-Clark",
    title: "CEO, Bioaccess",
    logoText: "bioaccess"
  },
  {
    company: "YC-backed startup",
    quote: "360Airo landed us some of our top provider partnerships!",
    name: "CEO",
    title: "YC-backed startup",
    logoText: "YC Startup"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + cardsToShow >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - cardsToShow : prev - 1
    );
  };

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, cardsToShow]);

  return (
    <section className="cs-testimonial-carousel-section">
      <div className="cs-testimonial-header">
        <h2>What <span className="cs-gradient-text">customers love</span><br/>about 360Airo</h2>
        <p>Take a look at what our current customers are saying about us.</p>
      </div>

      <div className="cs-carousel-container">
        <div className="cs-carousel-viewport">
          <div 
            className="cs-carousel-track" 
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` 
            }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="cs-carousel-slide"
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <div className="cs-carousel-card">
                  <div className="cs-carousel-logo">{t.logoText}</div>
                  <div className="cs-carousel-quote">
                    <span className="cs-quote-mark">“</span>
                    <p>{t.quote}</p>
                  </div>
                  <div className="cs-carousel-author">
                    <div className="cs-author-avatar">
                      {t.name.charAt(0)}
                    </div>
                    <div className="cs-author-info">
                      <h4>{t.name}</h4>
                      <span>{t.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-carousel-controls">
          <button onClick={prevSlide} className="cs-carousel-btn" aria-label="Previous">
            <ArrowLeft size={20} />
          </button>
          <div className="cs-carousel-dots">
            {testimonials.slice(0, testimonials.length - cardsToShow + 1).map((_, i) => (
              <div 
                key={i} 
                className={`cs-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="cs-carousel-btn" aria-label="Next">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
