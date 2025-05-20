import { useState } from 'react';
import Image from 'next/image';
import { getImageUrl, handleImageError } from '@/utils/imageHandler';

interface ImageWithFallbackProps {
  src: string | undefined;
  alt?: string;
  width?: number;
  height?: number;
  layout?: "fixed" | "fill" | "responsive" | "intrinsic";
  className?: string;
  priority?: boolean;
  useNextImage?: boolean;
  [x: string]: any; // For other props
}

/**
 * Component for displaying images with fallback handling for 404 errors
 */
const ImageWithFallback = ({
  src,
  alt = 'Product Image',
  width,
  height,
  className = '',
  priority = false,
  useNextImage = false,
  ...rest
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);
  
  // Get processed URL or fallback if there was an error
  const imgSrc = hasError 
    ? '/assets/img/product/placeholder.png' 
    : getImageUrl(src);
  
  // Handle image loading errors
  const onError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    handleImageError(e);
  };

  // Use Next.js Image component if specified
  if (useNextImage && width && height) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        onError={onError}
        {...rest}
      />
    );
  }
  
  // Fallback to standard img tag
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={onError}
      {...rest}
    />
  );
};

export default ImageWithFallback; 