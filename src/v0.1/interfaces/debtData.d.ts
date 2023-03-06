enum PaymentMethods {
    CASH,
    CARD,
}

interface Payments {
    amount: number,
    id: string,
    paidAt: Date,
    paymentMethod: PaymentMethods
}

interface IncomeOrExpense {
    id: string,
    name: string,
    createdAt: Date,
    paidAt: string,
    value: number
    url?: string
}

interface DebtData {
    payments: Payments[],
    amountPaid: number,
    id: string,
    initialDate: Date,
    totalAmount: number
}

interface IncomeData extends DebtData {
    incomes: IncomeOrExpense[],
}

interface ExpenseData extends DebtData {
    expenses: IncomeOrExpense[],
}