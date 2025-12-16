import { useState, useEffect } from 'react';

const founders = [
  {
    name: 'Kevin',
    month: 5,
    day: 9,
    linkedin: 'https://linkedin.com/in/kevinagustin',
  },
  {
    name: 'Martín',
    month: 11,
    day: 3,
    linkedin: 'https://linkedin.com/in/martinlago',
  },
  {
    name: 'Andres',
    month: 12,
    day: 8,
    linkedin: 'https://linkedin.com/in/andreschanchi',
  },
];

export default function BirthdayModal(translations) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const birthdayFounder = founders.find(
    f => f.month === currentMonth && f.day === currentDay
  );

  const [founder] = useState(birthdayFounder);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    if (founder) {
      setTimeout(() => setIsVisible(true), 100);
    }
    setTimeout(() => setIsMounting(false), 0);
  }, [founder]);

  if (!founder && !isVisible && !isMounting) return null;
  if (!founder) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible && !isMounting && founder) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-transform duration-300 relative overflow-hidden ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center pt-4">
          <div className="text-6xl mb-4">🎂</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {translations.title.replace('{name}', founder.name)}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{translations.message}</p>

          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-[#006400] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#004d00] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {translations.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
