export const capitalLetter = (letter: string) => {
  const separateWords = letter.toLocaleLowerCase().split(' ');
  const result = separateWords.map(item => item[0].toUpperCase() + item.slice(1)).join(' ');
  return result;
};
