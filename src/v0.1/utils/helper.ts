export const getInitialLetters = (name: string) => {
  const separator = (fullName: string) => {
    const letters = fullName.split(" ").map((e) => e.slice(0, 1).toUpperCase());
    return letters.slice(0, 3);
  };

  const letters = name.includes(" ")
    ? separator(name)
    : name.slice(0, 1).toUpperCase();
  return letters;
};

export const parseYYMMDD = (ISODate: string) => ISODate.split('T')[0]

export const parseDDMMYY = (ISODate: string) => {
  const date = parseYYMMDD(ISODate).split('-');

  return `${date[2]}-${date[1]}-${date[0]}`
}

export const parseDDMM = (ISODate: string) => {
  const date = parseYYMMDD(ISODate).split('-');

  return `${date[2]}-${date[1]}`
}