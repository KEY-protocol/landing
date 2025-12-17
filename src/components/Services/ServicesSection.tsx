import React from 'react';
import { ServiceCard } from './ServiceCard';
import { useCarousel } from './useCarousel';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  functionality: string;
  advantage: string;
  idealFor: string;
  status: 'available' | 'coming_soon';
}

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
  labels: {
    functionality: string;
    advantage: string;
    idealFor: string;
  };
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  services,
  labels,
}) => {
  const {
    currentIndex,
    containerRef,
    trackRef,
    sectionRef,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    pauseAutoAdvance,
    resumeAutoAdvance,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useCarousel({
    totalSlides: services.length,
  });

  return (
    <section
      ref={sectionRef}
      className="services-section py-20 bg-primary"
      data-current-index={currentIndex}
    >
      <div className="container mx-auto px-4">
        <div className="text-left mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="carousel-container overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
            onMouseEnter={pauseAutoAdvance}
            onMouseLeave={resumeAutoAdvance}
          >
            <div
              ref={trackRef}
              className="carousel-track flex"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              style={{ cursor: 'grab', userSelect: 'none' }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="carousel-slide min-w-full shrink-0 px-4 snap-center"
                >
                  <ServiceCard
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    icon={service.icon}
                    functionality={service.functionality}
                    advantage={service.advantage}
                    idealFor={service.idealFor}
                    isActive={index === currentIndex}
                    labels={labels}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {services.length > 1 && (
            <>
              {/* Navigation Buttons */}
              <div className="navigation-buttons flex justify-center gap-4 mt-8">
                <button
                  onClick={() => {
                    prevSlide();
                    pauseAutoAdvance();
                    setTimeout(resumeAutoAdvance, 3000);
                  }}
                  className="nav-button nav-button-prev"
                  aria-label="Previous slide"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    nextSlide();
                    pauseAutoAdvance();
                    setTimeout(resumeAutoAdvance, 3000);
                  }}
                  className="nav-button nav-button-next"
                  aria-label="Next slide"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="dot-indicators flex justify-center gap-3 mt-6">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      pauseAutoAdvance();
                      setTimeout(resumeAutoAdvance, 3000);
                    }}
                    className={`dot-indicator ${
                      index === currentIndex ? 'active' : ''
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .carousel-track {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .carousel-slide {
          flex-shrink: 0;
        }

        .carousel-container {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .carousel-container::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Navigation Buttons */
        .nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        .nav-button svg {
          transition: transform 0.3s ease;
        }

        .nav-button:hover svg {
          transform: translateX(0);
        }

        .nav-button-prev:hover svg {
          transform: translateX(-2px);
        }

        .nav-button-next:hover svg {
          transform: translateX(2px);
        }

        /* Dot Indicators */
        .dot-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot-indicator:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .dot-indicator.active {
          background: white;
          border-color: white;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .nav-button {
            width: 40px;
            height: 40px;
          }

          .nav-button svg {
            width: 20px;
            height: 20px;
          }

          .dot-indicator {
            width: 10px;
            height: 10px;
          }

          .dot-indicator.active {
            width: 24px;
          }
        }
      `}</style>
    </section>
  );
};
