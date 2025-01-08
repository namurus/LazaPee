const discountPercentageToPrice = (price, discountPercentage) => {
  return price - price * discountPercentage;
};

export { discountPercentageToPrice };
