import { Response } from "express";

export interface CustomerResponse extends Response {
  customer: {
    _doc: {
      city: string;
      birthdate: string;
    };
    name: string;
    lastname: string;
    email: string;
    city: string;
    birthdate: string;
  };
}

export interface BasePriceElement {
  amount: number;
  city: string;
}

export interface DiscountElement {
  discount: number;
  age: string;
}

export interface Customer {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  city: string;
  birthdate: string | null;
}
