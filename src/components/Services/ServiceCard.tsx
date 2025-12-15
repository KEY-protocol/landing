import React from 'react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  functionality: string;
  advantage: string;
  idealFor: string;
  isActive?: boolean;
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
}) => {
  return (
    <div className="relative">
      <div className="mb-8 flex justify-center">
        <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center p-6 shadow-lg border border-white/30">
          <img
            src={`/icons/services/${icon}`}
            alt={title}
            className="w-full h-full object-contain filter brightness-0 invert"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        <p className="text-sm md:text-base font-light italic opacity-80">
          {subtitle}
        </p>
      </div>

      <p className="text-center mb-8 leading-relaxed opacity-90">
        {description}
      </p>

      <div className="space-y-6 max-w-2xl mx-auto">
        <div>
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">•</span> Funcionalidad
          </h4>
          <p className="text-sm leading-relaxed opacity-85 pl-6">
            {functionality}
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">•</span> Ventaja
          </h4>
          <p className="text-sm leading-relaxed opacity-85 pl-6">{advantage}</p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">•</span> Ideal para
          </h4>
          <p className="text-sm leading-relaxed opacity-85 pl-6">{idealFor}</p>
        </div>
      </div>
    </div>
  );
};
