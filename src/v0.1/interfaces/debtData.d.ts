interface Payments {
  amount: number | string;
  id: string;
  paidAt: Date | string;
  paymentMethod: string;
}

interface IncomeOrExpense {
  id: string;
  name: string;
  createdAt: Date;
  paidAt: string;
  value: number;
  url?: string;
}

interface DebtData {
  payments: Payments[];
  amountPaid: number;
  id: string;
  initialDate: Date;
  totalAmount: number;
  amountToPay: number;
}

interface IncomeData extends DebtData {
  incomes: IncomeOrExpense[];
}

interface ExpenseData extends DebtData {
  expenses: IncomeOrExpense[];
}
