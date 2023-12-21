export const ellipsisText = (text: string, maxLength: number, lettersToCut: number) => {
  const textSplitted = text.split(' ');
  const lastWord = textSplitted[textSplitted.length - 1];

  if (text.length < maxLength) {
    //El texto es muy corto para ser cortado
    return text;
  }

  if (textSplitted.length === 1) {
    //Corta el texto que supere el maxLength y no tenga espacios en blanco
    return text.slice(0, text.length - lettersToCut).concat('...');
  }

  //Corta la ultima palabra y luego recorre al texto para integrarlo
  const shortLastWord = lastWord.slice(0, lastWord.length - lettersToCut).concat('...');

  return textSplitted
    .map(word => {
      return textSplitted[textSplitted.indexOf(word)] === lastWord ? shortLastWord : word;
    })
    .join(' ');
};
