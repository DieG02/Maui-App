interface InitialIncome {
  value: string;
  name: string;
  isPaid: boolean;
  paymentMethod: string;
  date: string;
  clientId: string;
}

interface InitialExpense {
  value: string;
  name: string;
  categoryId: string;
  isPaid: boolean;
  paymentMethod: string;
  date: string;
  providerId: string;
}
