import { useState, useEffect, useRef } from 'react';

export default function RoadmapCarousel({ phases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Touch handlers
  const onTouchStart = e => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = e => {
    e.preventDefault();
    setTouchEnd(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < phases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Mouse handlers for desktop drag
  const onMouseDown = e => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
    e.preventDefault();
  };

  const onMouseMove = e => {
    if (!isDragging || mouseStart === null) return;
    setMouseEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!mouseStart || !mouseEnd) {
      setIsDragging(false);
      return;
    }
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < phases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    return () => {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < phases.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, phases.length]);

  const goToSlide = index => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < phases.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={`relative overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {phases.map((phase, index) => (
            <div key={index} className="min-w-full shrink-0 px-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
                {/* Card Title */}
                <h3
                  className="text-2xl md:text-3xl font-montserrat font-bold mb-4"
                  style={{ color: '#2E7D32' }}
                >
                  {phase.title}
                </h3>

                {/* Description */}
                <p
                  className="text-base md:text-lg mb-6 leading-relaxed"
                  style={{ color: '#2E7D32' }}
                >
                  {phase.description}
                </p>

                {/* Milestones */}
                <div className="space-y-3">
                  {phase.milestones.map((milestone, milestoneIndex) => (
                    <div
                      key={milestoneIndex}
                      className="flex items-start gap-3"
                    >
                      {milestone.completed ? (
                        <div
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: '#4A9B7F' }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="shrink-0 w-6 h-6 rounded-full border-2 mt-0.5"
                          style={{ borderColor: '#4A9B7F' }}
                        ></div>
                      )}
                      <p
                        className={`text-base md:text-lg ${
                          milestone.completed
                            ? 'text-gray-800'
                            : 'text-gray-600'
                        }`}
                      >
                        {milestone.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {phases.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all ${
              currentIndex === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 hover:bg-white/30 active:scale-95'
            }`}
            aria-label="Fase anterior"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentIndex === phases.length - 1}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white transition-all ${
              currentIndex === phases.length - 1
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100 hover:bg-white/30 active:scale-95'
            }`}
            aria-label="Siguiente fase"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {phases.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {phases.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-3 rounded-full bg-white'
                  : 'w-3 h-3 rounded-full bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir a fase ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
