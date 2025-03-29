export type Customer = {
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
};

// export type TrainingWithCustomer = {
//   id: number;
//   date: string;
//   duration: number;
//   activity: string;
//   customer: Customer;
// };
