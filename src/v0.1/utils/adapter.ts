export const MAIN_LOCALE = 'es-ES';

export const parserToCurrency = (value: number, locale: string, currency: string) => {
  const minimumFractionDigits = Math.min(2, value % 1 === 0 ? 0 : 2);
  const isEmptyLocale = locale !== '';

  return value.toLocaleString(isEmptyLocale ? locale : MAIN_LOCALE, {
    style: 'currency',
    currency: currency,
    currencyDisplay: isEmptyLocale ? 'symbol' : 'code',
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: 2,
  });
};
