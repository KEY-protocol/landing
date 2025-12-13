import React, { useState, useEffect } from 'react';

const AnimatedCyclePhase = ({ phases, interval = 5000 }) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [phases.length, interval]);

  // Calcular índices de las fases anterior, actual y siguiente
  const prevPhaseIndex =
    (currentPhaseIndex - 1 + phases.length) % phases.length;
  const nextPhaseIndex = (currentPhaseIndex + 1) % phases.length;

  const prevPhase = phases[prevPhaseIndex];
  const currentPhase = phases[currentPhaseIndex];
  const nextPhase = phases[nextPhaseIndex];

  const getNodeVariant = (phaseIndex, nodeIndex) => {
    if (phaseIndex === 0) {
      return nodeIndex === 1 ? 'light' : nodeIndex === 3 ? 'gray' : 'dark';
    } else if (phaseIndex === 1) {
      return nodeIndex % 2 === 0 ? 'light' : 'dark';
    } else {
      return nodeIndex % 2 === 0 ? 'dark' : 'light';
    }
  };

  const getNodeClasses = variant => {
    if (variant === 'light') {
      return 'bg-white text-black shadow-lg';
    } else if (variant === 'gray') {
      return 'bg-[#E8E8E8] text-black shadow-md';
    } else {
      return 'bg-[#4B9C8E] text-white shadow-lg';
    }
  };

  const renderPhaseCard = (phase, phaseIndex, position) => {
    // position: 'prev', 'current', 'next'
    const isCenter = position === 'current';
    const isPrev = position === 'prev';
    const isNext = position === 'next';

    const positionClasses = isCenter
      ? 'translate-x-0 scale-100 opacity-100 blur-0 z-20'
      : isPrev
        ? '-translate-x-[80%] scale-80 opacity-50 blur-[2px] z-10'
        : 'translate-x-[80%] scale-80 opacity-50 blur-[2px] z-10';

    return (
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${positionClasses}`}
        style={{ pointerEvents: isCenter ? 'auto' : 'none' }}
      >
        <div className="bg-[#1A5F38] rounded-2xl p-8 h-full">
          <div className="transition-opacity duration-500">
            <h3 className="text-2xl font-bold mb-4 text-white">
              {phase.title}
            </h3>
            <p className="text-sm mb-12 max-w-2xl text-white">
              {phase.description}
            </p>
          </div>

          <div className="relative py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
              <svg
                className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 hidden md:block pointer-events-none"
                style={{ zIndex: 1 }}
                preserveAspectRatio="none"
                viewBox="0 0 1000 100"
              >
                <path
                  d="M 60 50 Q 200 20, 333 50 T 666 50 T 940 50"
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                  strokeDasharray="15 10"
                  opacity="0.5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-50"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <g key={i}>
                    <polygon points="0,-6 15,0 0,6" fill="#4B9C8E">
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.7}s`}
                        path="M 60 50 Q 200 20, 333 50 T 666 50 T 940 50"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        keyTimes="0;0.05;0.92;1"
                        dur="5s"
                        repeatCount="indefinite"
                        begin={`${i * 0.7}s`}
                      />
                    </polygon>
                  </g>
                ))}
              </svg>

              {phase.nodes.map((node, index) => {
                const variant = getNodeVariant(phaseIndex, index);
                const nodeClasses = getNodeClasses(variant);

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                    style={{ zIndex: 10 }}
                  >
                    <div
                      className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center text-center p-4 transition-all duration-500 ${nodeClasses}`}
                    >
                      <span className="text-sm font-bold leading-tight">
                        {node}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ minHeight: '500px' }}
    >
      {/* Fase anterior (izquierda, borrosa) */}
      {renderPhaseCard(prevPhase, prevPhaseIndex, 'prev')}

      {/* Fase actual (centro, nítida) */}
      {renderPhaseCard(currentPhase, currentPhaseIndex, 'current')}

      {/* Fase siguiente (derecha, borrosa) */}
      {renderPhaseCard(nextPhase, nextPhaseIndex, 'next')}
    </div>
  );
};

export default AnimatedCyclePhase;
