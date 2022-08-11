export const separator = (num: string): string => {
  num = num.replace(/\./g, '');
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return num.length > 0 ? (num + '').replace(reg, '$&.') : '';
}

export const round = (num: string, decimal: number): string => {
  const i = num.indexOf(",") + 1 ;
  return '' + num.slice(0, i + decimal);
}