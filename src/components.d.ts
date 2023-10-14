interface IncomeAndExpense {
  value: string;
  name: string;
  isPaid: boolean;
  date: string;
  paymentMethod: string;
}

interface InitialIncome extends IncomeAndExpense {
  clientId: string | null;
  clientName: string;
}

interface InitialExpense extends IncomeAndExpense {
  categoryId: string;
  providerId: string | null;
  providerName: string;
}

interface ExpenseResponse extends InitialExpense {
  id: string;
}

interface ValidateOptions {
  isPaid: string[];
  isPending: string[];
}
