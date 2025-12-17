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
              className="carousel-track flex select-none cursor-grab"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
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
                  className="nav-button nav-button-prev flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-2 border-white/20 text-white cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-[10px] hover:bg-white/20 hover:border-white/40 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95"
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
                  className="nav-button nav-button-next flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-2 border-white/20 text-white cursor-pointer transition-all duration-300 ease-in-out backdrop-blur-[10px] hover:bg-white/20 hover:border-white/40 hover:scale-110 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] active:scale-95"
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

              <div className="dot-indicators flex justify-center gap-3 mt-6">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      goToSlide(index);
                      pauseAutoAdvance();
                      setTimeout(resumeAutoAdvance, 3000);
                    }}
                    className={`p-0 cursor-pointer transition-all duration-300 ease-in-out border-2 rounded-full hover:scale-125 ${
                      index === currentIndex
                        ? 'w-8 md:w-8 h-3 md:h-3 bg-white border-white rounded-md shadow-[0_2px_8px_rgba(255,255,255,0.3)]'
                        : 'w-3 md:w-3 h-3 md:h-3 bg-white/30 border-white/40 hover:bg-white/50'
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
      `}</style>
    </section>
  );
};
