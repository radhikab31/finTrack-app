export const formatNumber = (num) => {
  // Check if the number is an integer or if the decimals are negligible
  // This will turn 5.008... into 5, but keep 5.05 as 5.05
  return parseFloat(num.toFixed(2)) * 1 === Math.floor(num) ? Math.floor(num) : parseFloat(num.toFixed(2));
};
