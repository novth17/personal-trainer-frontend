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
  _links: any;
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  };
};


