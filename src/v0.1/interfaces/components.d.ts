interface IDebtContact {
  id: string;
  name: string;
  purchases?: string;
  sales: number;
  totalPrice: number;
  date: string;
}

type IncomeDebt = {
  id: string;
  clientName: string;
  sales: number;
  totalPrice: number;
  startingDate: string;
  totalToPay: number;
};

type ExpenseDebt = {
  id: string;
  providerName: string;
  sales: number;
  totalPrice: number;
  startingDate: string;
  totalToPay: number;
};

type CountryItem = {
  countryName: string;
  isoCode: string;
  countryPrefix: string;
};

type Summary = {
  amount: number;
  stakeholders: number;
};

type Dictionary = {
  nombre: string;
  key: string;
};

type Options = {
  locale: string;
  label: string;
  flag: string;
};
