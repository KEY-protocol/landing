interface OptimizedImageProps {
  src: string;
  srcWebp: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * OptimizedImage component that serves WebP images with JPG/PNG fallback
 * Uses the HTML <picture> element for automatic browser-based format selection
 *
 * @param src - Fallback image source (JPG/PNG) for browsers without WebP support
 * @param srcWebp - WebP image source (preferred format)
 * @param alt - Image alt text for accessibility
 * @param className - Optional CSS classes to apply to the image
 * @param loading - Optional loading strategy ('lazy' or 'eager'), defaults to 'lazy'
 */
export default function OptimizedImage({
  src,
  srcWebp,
  alt,
  className = '',
  loading = 'lazy',
}: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={srcWebp} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <img src={src} alt={alt} className={className} loading={loading} />
    </picture>
  );
}
