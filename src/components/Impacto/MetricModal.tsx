import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import OptimizedImage from '@components/ui/OptimizedImage';

interface MetricModalProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageSrcWebp: string;
  imageAlt: string;
}

type AnimationState = 'closed' | 'opening' | 'open' | 'closing';

export default function MetricModal({
  id,
  title,
  description,
  imageSrc,
  imageSrcWebp,
  imageAlt,
}: MetricModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [animationState, setAnimationState] =
    useState<AnimationState>('closed');
  const modalRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  // Handle open/close transitions
  useLayoutEffect(() => {
    if (isOpen && animationState === 'closed') {
      setAnimationState('opening');
    } else if (!isOpen && animationState === 'open') {
      setAnimationState('closing');
    }
  }, [isOpen, animationState]);

  useEffect(() => {
    if (animationState === 'opening') {
      animationTimeoutRef.current = requestAnimationFrame(() => {
        setAnimationState('open');
      });
    } else if (animationState === 'closing') {
      animationTimeoutRef.current = window.setTimeout(() => {
        setAnimationState('closed');
      }, 300);
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        cancelAnimationFrame(animationTimeoutRef.current);
      }
    };
  }, [animationState]);

  // Listen for open events from outside
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent<{ modalId: string }>) => {
      if (e.detail?.modalId === id) {
        setIsOpen(true);
      }
    };

    window.addEventListener(
      `open-modal-${id}`,
      handleOpenModal as EventListener
    );
    return () => {
      window.removeEventListener(
        `open-modal-${id}`,
        handleOpenModal as EventListener
      );
    };
  }, [id]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const shouldRender = animationState !== 'closed';
  const isVisible = animationState === 'open';

  if (!shouldRender) return null;

  return (
    <div
      ref={modalRef}
      className={`modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      data-modal
    >
      <div
        className={`relative w-full max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[300px] sm:aspect-video transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Background Image */}
        <OptimizedImage
          src={imageSrc}
          srcWebp={imageSrcWebp}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/70 z-0"></div>

        {/* Close button */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 rounded-full bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 transition-colors hover:bg-black/70"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar modal"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Title Block */}
          <div className="mt-8 mb-3 sm:mt-0">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-montserrat font-bold leading-tight max-w-[80%]">
              {title}
            </h3>
          </div>

          {/* Description Block */}
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mt-auto">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
