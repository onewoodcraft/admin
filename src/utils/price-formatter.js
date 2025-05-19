/**
 * Formats a number as INR currency
 * @param {number} amount - The amount to format
 * @returns {string} - The formatted amount in INR
 */
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Converts USD to INR
 * @param {number} usdAmount - The amount in USD
 * @returns {number} - The amount in INR
 */
export const convertUSDtoINR = (usdAmount) => {
  // Using a fixed conversion rate of 1 USD = 83 INR
  // In a production environment, this should be fetched from an API
  const conversionRate = 83;
  return usdAmount * conversionRate;
};

/**
 * Formats USD amount as INR
 * @param {number} usdAmount - The amount in USD
 * @returns {string} - The formatted amount in INR
 */
export const formatPriceINR = (usdAmount) => {
  const inrAmount = convertUSDtoINR(usdAmount);
  return formatINR(inrAmount);
};

/**
 * Converts INR to USD
 * @param {number} inrAmount - The amount in INR
 * @returns {number} - The amount in USD
 */
export const convertINRtoUSD = (inrAmount) => {
  // Using a fixed conversion rate of 1 USD = 83 INR
  const conversionRate = 83;
  return inrAmount / conversionRate;
}; 