import moment from "moment";

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

export const transformToDate = (date: string) => {
  const fechaAnalizada = moment.utc(date);

  const fechaFormateada = fechaAnalizada.format("DD-MM-YYYY");

  return fechaFormateada;
};

export const convertDateToIso = (date: string) => {
  const fechaAnalizada = moment(date, "DD-MM-YYYY");

  const fechaYHora = moment.utc();

  fechaYHora.year(fechaAnalizada.year());
  fechaYHora.month(fechaAnalizada.month());
  fechaYHora.date(fechaAnalizada.date());

  const fechaISO8601 = fechaYHora.toISOString();

  return fechaISO8601;
};
