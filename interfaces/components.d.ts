interface ITransaction {
  name: string;
  price: string;
  color: string;
  icon: string;
  type: string;
  state: string;
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
