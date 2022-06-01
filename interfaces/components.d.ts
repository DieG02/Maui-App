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
}

interface IProduct {
  image: string;
  price: string;
  description: string;
  stock: number;
}

interface IContact {
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
}
