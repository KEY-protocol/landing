import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselOptions {
  totalSlides: number;
  onSlideChange?: (index: number) => void;
}

export function useCarousel({
  totalSlides,
  onSlideChange,
}: UseCarouselOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Touch/Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Mouse drag handling
  const isDragging = useRef(false);
  const mouseStartX = useRef(0);
  const mouseEndX = useRef(0);

  const goToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const slideWidth = containerRef.current.offsetWidth;
    containerRef.current.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth',
    });
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }, [currentIndex, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
  }, [currentIndex, totalSlides, goToSlide]);

  const hideSwipeHint = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  // Detect visible slide based on scroll position
  const detectVisibleSlide = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const slides = container.querySelectorAll('.carousel-slide');

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(containerCenter - slideCenter);

      if (distance < slideRect.width / 2) {
        if (currentIndex !== index) {
          setCurrentIndex(index);
          onSlideChange?.(index);
        }
      }
    });
  }, [currentIndex, onSlideChange]);

  // Scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', detectVisibleSlide);
    return () => container.removeEventListener('scroll', detectVisibleSlide);
  }, [detectVisibleSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        hideSwipeHint();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        hideSwipeHint();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, hideSwipeHint]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const swipeDistance = touchStartX.current - touchEndX.current;

      if (swipeDistance > swipeThreshold) {
        nextSlide();
        hideSwipeHint();
      } else if (swipeDistance < -swipeThreshold) {
        prevSlide();
        hideSwipeHint();
      }
    },
    [nextSlide, prevSlide, hideSwipeHint]
  );

  // Mouse drag events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    mouseEndX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }

    const dragThreshold = 50;
    const dragDistance = mouseStartX.current - mouseEndX.current;

    if (dragDistance > dragThreshold) {
      nextSlide();
      hideSwipeHint();
    } else if (dragDistance < -dragThreshold) {
      prevSlide();
      hideSwipeHint();
    }

    mouseStartX.current = 0;
    mouseEndX.current = 0;
  }, [nextSlide, prevSlide, hideSwipeHint]);

  // Mouse drag global listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    currentIndex,
    hasInteracted,
    containerRef,
    trackRef,
    sectionRef,
    goToSlide,
    nextSlide,
    prevSlide,
    hideSwipeHint,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
  };
}
