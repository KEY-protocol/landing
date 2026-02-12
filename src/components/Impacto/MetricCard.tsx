import { useRipple, RippleContainer } from '@components/ui/Ripple';
import { StaggeredItem } from '@components/ui/StaggeredItem';
import OptimizedImage from '@components/ui/OptimizedImage';

interface MetricCardProps {
  id: string;
  title: string;
  imageSrc: string;
  imageSrcWebp: string;
  imageAlt: string;
  index: number;
}

export default function MetricCard({
  id,
  title,
  imageSrc,
  imageSrcWebp,
  imageAlt,
  index,
}: MetricCardProps) {
  const { ripples, createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    createRipple(e);
    window.dispatchEvent(
      new CustomEvent(`open-modal-${id}`, { detail: { modalId: id } })
    );
  };

  return (
    <StaggeredItem index={index} staggerDelay={150}>
      <div
        id={`card-${id}`}
        className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-95 text-white border border-white/10"
        onClick={handleClick}
      >
        <OptimizedImage
          src={imageSrc}
          srcWebp={imageSrcWebp}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex items-center justify-center p-5 sm:p-6 md:p-8">
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-montserrat font-bold text-center leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            {title}
          </h3>
        </div>
        <RippleContainer ripples={ripples} />
      </div>
    </StaggeredItem>
  );
}
