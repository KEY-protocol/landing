import React from 'react';
import type { IconProps } from '../icons/types';
import { BiometricIcon } from '../icons/services/BiometricIcon';
import { KeyBoxIcon } from '../icons/services/KeyBoxIcon';
import { StatsIcon } from '../icons/services/StatsIcon';
import { DocIcon } from '../icons/services/DocIcon';

// Map icon identifiers to their respective components
const iconComponents: Record<string, React.FC<IconProps>> = {
  biometric: BiometricIcon,
  keyBox: KeyBoxIcon,
  stats: StatsIcon,
  doc: DocIcon,
};

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  functionality: string;
  advantage: string;
  idealFor: string;
  isActive?: boolean;
  labels: {
    functionality: string;
    advantage: string;
    idealFor: string;
  };
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  functionality,
  advantage,
  idealFor,
  isActive = false,
  labels,
}) => {
  const IconComponent = iconComponents[icon];

  return (
    <div className="relative">
      {/* Icon */}
      <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#2D5A47] backdrop-blur-sm rounded-2xl sm:rounded-3xl flex items-center justify-center p-4 sm:p-5 md:p-6 shadow-lg border border-[#2D5A47]">
          {IconComponent ? (
            <IconComponent className="w-full h-full" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded" />
          )}
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-light italic opacity-80">
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-center text-sm sm:text-base mb-5 sm:mb-6 md:mb-8 leading-relaxed opacity-90 px-1 sm:px-0">
        {description}
      </p>

      {/* Detail sections */}
      <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto">
        <div>
          <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 flex items-center gap-2">
            <span className="text-lg sm:text-xl">•</span> {labels.functionality}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed opacity-85 pl-5 sm:pl-6">
            {functionality}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 flex items-center gap-2">
            <span className="text-lg sm:text-xl">•</span> {labels.advantage}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed opacity-85 pl-5 sm:pl-6">
            {advantage}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 flex items-center gap-2">
            <span className="text-lg sm:text-xl">•</span> {labels.idealFor}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed opacity-85 pl-5 sm:pl-6">
            {idealFor}
          </p>
        </div>
      </div>
    </div>
  );
};
