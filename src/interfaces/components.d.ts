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
