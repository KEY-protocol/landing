import { useState, useEffect, useRef } from 'react';

export default function MetricModal({
  id,
  value,
  label,
  description,
  imageSrc,
  imageAlt,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Listen for open events from outside
  useEffect(() => {
    const handleOpenModal = e => {
      if (e.detail?.modalId === id) {
        setIsOpen(true);
      }
    };

    window.addEventListener(`open-modal-${id}`, handleOpenModal);
    return () => {
      window.removeEventListener(`open-modal-${id}`, handleOpenModal);
    };
  }, [id]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
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
    const handleEscape = e => {
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

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      data-modal
    >
      <div
        className="relative mx-4 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl aspect-video"
        onClick={e => e.stopPropagation()}
      >
        {/* Background Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="modal-image absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/40"></div>

        {/* Close button */}
        <button
          className="modal-close-button absolute top-4 right-4 z-20 rounded-full bg-black/50 backdrop-blur-sm p-2 text-white transition-colors hover:bg-black/70"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar modal"
        >
          <svg
            className="h-6 w-6"
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

        {/* Metric Block - Top Left */}
        <div className="modal-content-metric absolute top-6 left-6 md:top-8 md:left-8 z-10">
          <div className="rounded-xl  p-4 md:p-6 ">
            <div className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-2">
              {value}
            </div>
            <div className="text-base md:text-lg font-montserrat font-semibold text-white">
              {label}
            </div>
          </div>
        </div>

        {/* Description Block - Bottom Left */}
        <div className="modal-content-description absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 max-w-2xl">
          <div className="rounded-xl  p-4 md:p-6 ">
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
