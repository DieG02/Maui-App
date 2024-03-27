export const parserToCurrency = (value: number, locale: string, currency: string) => {
  const minimumFractionDigits = Math.min(2, value % 1 === 0 ? 0 : 2);

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: 2,
  });
};
