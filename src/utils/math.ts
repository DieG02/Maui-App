export const separator = (num: string): string => {
  num = num.replace(/\./g, '');
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return num.length > 0 ? (num + '').replace(reg, '$&.') : '';
}

export const round = (num: string): string => {
  const i = num.indexOf(",");
  const [integer, decimal] = num.split(",");
  num = integer + (decimal ? "," + decimal.replace(/\.| /g, '') : '');
  if(i === -1) return num; // Without ","
  else if (i === num.length - 1) return num.slice(0, -1); // Ends like "123,"
  else return num.slice(0, i + 3); // Round to 2 decimals after ","
}