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
}

const serviceColors = ['#7D9E64', '#3E6B2F', '#2E5E2B', '#284D21'];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  description,
  services,
}) => {
  const {
    currentIndex,
    hasInteracted,
    containerRef,
    trackRef,
    sectionRef,
    goToSlide,
    hideSwipeHint,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
  } = useCarousel({
    totalSlides: services.length,
    serviceColors,
  });

  return (
    <section
      ref={sectionRef}
      className="services-section transition-colors duration-700 py-20"
      data-current-index={currentIndex}
      style={{ backgroundColor: serviceColors[0] }}
    >
      <div className="container mx-auto px-4">
        <div className="text-left mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="carousel-container overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
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
                  className="carousel-slide min-w-full flex-shrink-0 px-4 snap-center"
                >
                  <ServiceCard
                    title={service.title}
                    subtitle={service.subtitle}
                    description={service.description}
                    icon={service.icon}
                    functionality={service.functionality}
                    advantage={service.advantage}
                    idealFor={service.idealFor}
                    status={service.status}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p
              className={`swipe-hint text-white/70 text-sm animate-pulse transition-opacity duration-500 ${
                hasInteracted ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ display: hasInteracted ? 'none' : 'block' }}
            >
              ← Desliza para ver más servicios →
            </p>

            <div className="flex justify-center gap-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  data-index={index}
                  aria-label={`Ir al servicio ${index + 1}`}
                  onClick={() => {
                    goToSlide(index);
                    hideSwipeHint();
                  }}
                />
              ))}
            </div>
          </div>
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

        .carousel-dot {
          transition: all 0.3s ease;
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
      `}</style>
    </section>
  );
};
