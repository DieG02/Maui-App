// AUTH GOOGLE
export type IAuthGoogleInput = {
  email: string;
  authSource: string;
  name: string;
  photo: string;
};

export type ICreateAuthGoogle = {
  email: string;
  name: string;
  cellphone: string;
  countryCode: string;
  language: string;
  country: string;
  photo: string;
};

export type IAuthGoogleResponse = {
  id: string;
  email: string;
  name: string;
  authSource: string;
  photo: string;
};

export type IAuthGoogle = {
  id: string;
  email: string;
  token: string;
  screenRedirect: string;
};

// Account
export type IAccount = {
  id: string;
  name: string;
  cellPhone: string;
  country: string;
  countryCode: string;
  language: string;
  image: string | null;
  address: string | null;
  ownerId: string;
};

export type IAccountInput = {
  address?: string;
  cellPhone?: string;
  name?: string;
  countryCode?: string;
  image?: string;
  country?: string;
  language?: string;
};

// Contacts
export type IContact = {
  id: string;
  name: string;
  phone: string;
  type: IContactType;
  email: string;
  note: string;
  ownerId: string;
};

export enum IContactType {
  CLIENT = 'CLIENT',
  PROVIDER = 'PROVIDER',
  EMPLOYEE = 'EMPLOYEE',
}

export type IContactInput = {
  note: string;
  email: string;
  name: string;
  phone: string;
  type: IContactType;
};

// Balance

export type IBalance = {
  total_balance?: number;
  financialAccounts: IFinancialAccount[];
};

export type IFinancialAccount = {
  id: string;
  businessId: string;
  accountName: string;
  mainAccount: boolean;
  currency: ICurrency;
  total_balance: number;
};

export type IBalanceItem = {
  month: string;
  year: string;
  incomes: number;
  expenses: number;
  total: number;
  previousBalance: number;
};

export type IMonthlyBalance = {
  currency: ICurrency;
  balance: IBalanceItem[];
};

export type IMontlyStats = {
  incomes: string;
  expenses: string;
  debt: string;
  toCollect: string;
};

// Countries
export type ICountry = {
  id: string;
  name: string;
  isoCode: string;
};

// CountryCode

export type ICountryCode = {
  id: string;
  name: string;
  isoCode: string;
  prefix: string;
};

// Currency
export type ICurrency = {
  id: string;
  code: string;
  symbol: string;
  locale: string;
  country: string;
  image: string | null;
  isoCode: string;
};

// Debt
export type IDebtDetail = {
  contactId: string;
  contactName: string;
  initialDate: string;
  totalToPay: number;
  amountDebts: number;
  financialAccount: {
    id: string;
    accountName: string;
    currency: ICurrency;
  };
};

export type IDebts = {
  incomes: IDebtDetail[];
  expenses: IDebtDetail[];
};

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export type IDebt = {
  id: string;
  initial_date: Date | null;
  total_amount: number;
  type: TransactionType;
  createdAt: Date;
  debtorId: string | null;
  financialAccountId: string | null;
  ownerId: string;
};

export type IDebtor = {
  financialAccount: {
    id: string;
    accountName: string;
    currency: ICurrency;
  };
  profile: IContact;
  status: {
    totalDebt: number;
    totalToPay: number;
  };
  debts: IDebt[];
  payments: ITransaction[];
};

export type IPayDebtInput = {
  type: TransactionType;
  paymentAmount: number;
  paidAt: string;
  payment_method: IPaymentMethod;
  description: string;
};

export enum IPaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  OTHER = 'OTHER',
  ONLINE = 'ONLINE',
  NONE = 'NONE',
}

export enum TransactionStatus {
  DEBT = 'DEBT',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
}

export type ITransaction = {
  status: TransactionStatus;
  type: TransactionType;
  payment_method: IPaymentMethod;
  id: string;
  total_amount: number;
  description: string;
  date: string;
  categoryId: string;
  contactId: string;
  debtId: string;
  financialAccountId: string;
  ownerId: string;
};

export interface ITransactionDetail extends ITransaction {
  category: ITransactionCategory;
  contact: IContact;
  financialAccount: {
    accountName: string;
    currency: ICurrency;
  };
}

export type IQueryTransaction = {
  take?: number;
  type?: TransactionType;
  status?: TransactionStatus;
};

export type ITransactionInput = {
  status: TransactionStatus;
  type: TransactionType;
  total_amount: number;
  description: string;
  date: string;
  payment_method: IPaymentMethod;
  categoryId?: string;
  contactId: string;
  financialAccountId: string;
};

export enum TransactionGroup {
  TRANSACTION = 'TRANSACTION',
  PAYMENT = 'PAYMENT',
}

export type ITransactionCategory = {
  id: string;
  name: string;
  code: string;
  image: string;
  type: TransactionType;
  group: TransactionGroup;
};

// Link
export type ILink = {
  id: string;
  name: string;
  url: string;
};

export enum ILinkType {
  PLAYSTORE = 'PLAYSTORE',
  APPSTORE = 'APPSTORE',
  WHATSAPP = 'WHATSAPP',
  WEB = 'WEB',
}

// App Version

export enum AppStatus {
  LIVE = 'LIVE',
  ERROR = 'ERROR',
  DEPRECATED = 'DEPRECATED',
  NEEDS_UPDATE = 'NEEDS_UPDATE',
}
export type IAppVersion = {
  version: string;
  releaseDate?: string;
  description?: string;
  available: boolean;
  status: AppStatus;
};
