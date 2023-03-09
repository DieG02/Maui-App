enum PaymentMethods {
    CASH = "Efectivo",
    CARD = "Tarjeta",
    BANK_TRANSFER = "Transferencia",
    OTHER = "Otro"
}

interface Payments {
    amount: number | string,
    id: string,
    paidAt: Date | string,
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