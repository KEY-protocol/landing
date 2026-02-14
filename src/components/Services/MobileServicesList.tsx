import React, { useState } from 'react';
import type { IconProps } from '../icons/types';
import { BiometricIcon } from '../icons/services/BiometricIcon';
import { KeyBoxIcon } from '../icons/services/KeyBoxIcon';
import { StatsIcon } from '../icons/services/StatsIcon';
import { DocIcon } from '../icons/services/DocIcon';

const iconComponents: Record<string, React.FC<IconProps>> = {
  biometric: BiometricIcon,
  keyBox: KeyBoxIcon,
  stats: StatsIcon,
  doc: DocIcon,
};

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

interface MobileServicesListProps {
  services: Service[];
  labels: {
    functionality: string;
    advantage: string;
    idealFor: string;
  };
}

const MobileServiceCard: React.FC<{
  service: Service;
  labels: MobileServicesListProps['labels'];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ service, labels, isOpen, onToggle }) => {
  const IconComponent = iconComponents[service.icon];

  return (
    <div
      className="mobile-service-card rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left cursor-pointer transition-colors duration-200 hover:bg-white/5 border-0 bg-transparent"
        aria-expanded={isOpen}
      >
        {/* Icon */}
        <div className="w-14 h-14 shrink-0 bg-[#2D5A47] rounded-xl flex items-center justify-center p-3 shadow-md border border-[#2D5A47]">
          {IconComponent ? (
            <IconComponent className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded" />
          )}
        </div>

        {/* Title + Subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white leading-tight truncate">
            {service.title}
          </h3>
          <p className="text-xs font-light italic text-white/70 mt-0.5 truncate">
            {service.subtitle}
          </p>
        </div>

        {/* Chevron */}
        <div
          className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className="transition-all duration-400 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? '600px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-5 pt-1">
          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-4" />

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/85 mb-5">
            {service.description}
          </p>

          {/* Detail sections */}
          <div className="space-y-4">
            <div className="rounded-xl bg-white/5 p-3">
              <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block" />
                {labels.functionality}
              </h4>
              <p className="text-xs leading-relaxed text-white/75 pl-4">
                {service.functionality}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block" />
                {labels.advantage}
              </h4>
              <p className="text-xs leading-relaxed text-white/75 pl-4">
                {service.advantage}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 p-3">
              <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary inline-block" />
                {labels.idealFor}
              </h4>
              <p className="text-xs leading-relaxed text-white/75 pl-4">
                {service.idealFor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MobileServicesList: React.FC<MobileServicesListProps> = ({
  services,
  labels,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? -1 : index));
  };

  return (
    <div className="space-y-3">
      {services.map((service, index) => (
        <MobileServiceCard
          key={service.id}
          service={service}
          labels={labels}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};
