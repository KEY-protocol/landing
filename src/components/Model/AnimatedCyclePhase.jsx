import React, { useState, useEffect } from 'react';

const AnimatedCyclePhase = ({ phases, interval = 5000 }) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);
    }, interval);

    return () => clearInterval(timer);
  }, [phases.length, interval]);

  const currentPhase = phases[currentPhaseIndex];

  // Determine node colors based on phase
  const getNodeVariant = index => {
    if (currentPhaseIndex === 0) {
      // Phase 1: dark, light, dark, gray
      return index === 1 ? 'light' : index === 3 ? 'gray' : 'dark';
    } else if (currentPhaseIndex === 1) {
      // Phase 2: light, dark, light, dark
      return index % 2 === 0 ? 'light' : 'dark';
    } else {
      // Phase 3: dark, light, dark, light
      return index % 2 === 0 ? 'dark' : 'light';
    }
  };

  const getNodeClasses = variant => {
    if (variant === 'light') {
      return 'bg-white text-black';
    } else if (variant === 'gray') {
      return 'bg-[#D3D3D3] text-black';
    } else {
      return 'bg-[#1A5F38] text-white';
    }
  };

  return (
    <div className="bg-[#1A5F38] rounded-2xl p-8 relative overflow-hidden">
      {/* Title and Description with fade transition */}
      <div className="transition-opacity duration-500" key={currentPhaseIndex}>
        <h3 className="text-2xl font-bold mb-4 text-white">
          {currentPhase.title}
        </h3>
        <p className="text-sm mb-12 max-w-2xl text-white">
          {currentPhase.description}
        </p>
      </div>

      {/* Nodes Container */}
      <div className="relative py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {currentPhase.nodes.map((node, index) => {
          const variant = getNodeVariant(index);
          const nodeClasses = getNodeClasses(variant);

          return (
            <div key={index} className="relative flex flex-col items-center">
              {/* Animated Dashed Circle Border */}
              <svg
                className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  className="opacity-50 animate-spin-slow"
                  style={{ transformOrigin: 'center' }}
                />
              </svg>

              {/* Animated Arrows */}
              <div className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-spin-slow">
                {/* Top Arrow */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-[#4B9C8E]" />
                </div>
                {/* Right Arrow */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-[#4B9C8E]" />
                </div>
                {/* Bottom Arrow */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-[#4B9C8E]" />
                </div>
              </div>

              {/* Node Content */}
              <div
                className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-center p-4 transition-all duration-500 ${nodeClasses}`}
              >
                <span className="text-sm font-bold leading-tight">{node}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedCyclePhase;
