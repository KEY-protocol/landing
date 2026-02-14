import React from 'react';
import { ServiceCard } from './ServiceCard';
import { CarouselDots } from './CarouselDots';
import { CarouselNavigationButtons } from './CarouselNavigationButtons';
import { MobileServicesList } from './MobileServicesList';
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
      className="services-section py-10 sm:py-14 md:py-20 bg-primary"
      data-current-index={currentIndex}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header - shared across both layouts */}
        <div className="text-left mb-6 sm:mb-12 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-sm sm:text-lg md:text-xl opacity-90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* ===== MOBILE LAYOUT: Accordion cards (visible < md) ===== */}
        <div className="block md:hidden max-w-lg mx-auto">
          <MobileServicesList services={services} labels={labels} />
        </div>

        {/* ===== TABLET + DESKTOP LAYOUT: Carousel (visible >= md) ===== */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
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
              <CarouselNavigationButtons
                onPrevious={() => {
                  prevSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
                onNext={() => {
                  nextSlide();
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
              />

              <CarouselDots
                totalDots={services.length}
                currentIndex={currentIndex}
                onDotClick={index => {
                  goToSlide(index);
                  pauseAutoAdvance();
                  setTimeout(resumeAutoAdvance, 3000);
                }}
              />
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
      `}</style>
    </section>
  );
};
