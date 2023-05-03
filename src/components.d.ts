interface IncomeAndExpense {
  value: string
  name: string
  isPaid: boolean
  date: string
  paymentMethod: string
}

interface InitialIncome extends IncomeAndExpense {
  clientId: string
}

interface InitialExpense extends IncomeAndExpense {
  categoryId: string
  providerId: string
}

interface ExpenseResponse extends InitialExpense {
  id: string
}

interface ValidateOptions {
  isPaid: string[]
  isPending: string[]
}
