export const MAIN_LOCALE = 'es-ES';

export const parserToCurrency = (value: number, locale: string, currency: string) => {
  const minimumFractionDigits = Math.min(2, value % 1 === 0 ? 0 : 2);

  return value.toLocaleString(MAIN_LOCALE, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'code',
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: 2,
  });
};
