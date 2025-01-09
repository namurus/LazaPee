import CurrencyFormatter from './CurrencyFormatter';

class ValueConverter {
  static formatCurrency(value, currency) {
    return CurrencyFormatter.formatWithLocaleInfo(value, currency);
  }

  static formatDateTime(value, options = { dateOnly: false }) {
    if (options.dateOnly) {
      return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(new Date(value));
    }
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(value));
  }
}

export default ValueConverter;
