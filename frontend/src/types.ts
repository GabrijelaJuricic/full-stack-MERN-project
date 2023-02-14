export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  city: string;
  birthdate: string | null;
}

export interface Price {
  data: number;
}

export {};
