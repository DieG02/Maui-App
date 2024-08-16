export const separator = (num: string | number): string => {
  if (typeof num === 'number') num = num.toString();
  num = num.replace(/[\s\.]/g, '');
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return num.length > 0 ? (num + '').replace(reg, '$&.') : '';
};

export const round = (num: string): string => {
  // 4.278,358
  num = num.replace(/[\s\.]/g, ''); // 4278,358
  let [int, float]: (string | number)[] = num.split(','); // [4278, 358]
  int = parseInt(int); // type int
  float = parseFloat(0 + '.' + float); // type float
  const decimals = Math.round((float + Number.EPSILON) * 100); // 36
  if (!decimals) return separator(int);
  else if (decimals < 10) return separator(int) + ',0' + decimals;
  else if (decimals === 100) return separator(int + 1);
  else return separator(int) + ',' + decimals;
};
