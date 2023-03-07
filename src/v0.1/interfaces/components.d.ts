interface ITransaction {
  name: string;
  value: string;
  color: string;
  icon: string;
  type: string;
  state: string;
  id: string;
  paymentMethod: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

interface IProduct {
  image: string;
  price: string;
  description: string;
  stock: number;
}

interface IContact {
  id: string;
  phone: string;
  name: string;
}

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
  totalPrice: number,
  startingDate: string
}

type ExpenseDebt = {
  id: string;
  providerName: string;
  sales: number;
  totalPrice: number,
  startingDate: string
}

type Summary = {
  amount: number
  stakeholders: number
}