export type Customer = {
  _links: any;
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
};

export type Training = {
  date: string;
  duration: number;
  activity: string;
  customer: Customer;
  _links: {
    training: { href: string };
    customer: { href: string };
  };
};

