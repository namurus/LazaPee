class CurrencyFormatter {
  static formatWithLocaleInfo(value, currency) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency,
    }).format(value);
  }
}

export default CurrencyFormatter;
