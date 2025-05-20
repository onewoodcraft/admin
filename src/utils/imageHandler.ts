/**
 * Utilities for handling images in the admin panel
 */

/**
 * Process image URLs to ensure proper display
 * @param {string} imgPath - The image path to process
 * @returns {string} - The processed image URL
 */
export const getImageUrl = (imgPath: string | undefined): string => {
  // Default fallback image
  const fallbackImage = '/assets/img/product/placeholder.png';
  
  // Handle undefined or empty paths
  if (!imgPath) return fallbackImage;
  
  // Handle Cloudinary or other external URLs
  if (imgPath.startsWith('http')) return imgPath;
  
  // Handle local paths
  if (imgPath.startsWith('/assets')) return imgPath;
  
  // Default handling for other paths
  return `/assets/img/product/${imgPath}`;
};

/**
 * Handle image load errors
 * @param {Event} event - The error event
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>): void => {
  const target = event.target as HTMLImageElement;
  target.src = '/assets/img/product/placeholder.png';
  target.onerror = null; // Prevent infinite loop
};

/**
 * Check if an image URL is valid and accessible
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} - Whether the image is accessible
 */
export const isImageValid = async (url: string): Promise<boolean> => {
  // Skip validation for relative URLs (assumed to be valid)
  if (!url.startsWith('http')) return true;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error validating image:', error);
    return false;
  }
}; 