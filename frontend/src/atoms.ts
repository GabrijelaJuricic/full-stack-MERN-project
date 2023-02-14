import { atom } from "recoil";
import { Customer } from "./types";

export const modalShowState = atom({
  key: "modalShowState",
  default: false,
});
export const viewModeState = atom({
  key: "viewModeState",
  default: "",
});
export const newCustomerState = atom({
  key: "newCustomerState",
  default: {},
});
export const customerBirthdateState = atom<Date | null>({
  key: "customerBirthdateState",
  default: null,
});
export const customerDetailsState = atom({
  key: "customerDetailsState",
  default: {} as Customer,
});
export const editCustomersDetailsState = atom({
  key: "editCustomersDetailsState",
  default: {} as Customer,
});
export const updatedCustomerState = atom({
  key: "updatedCustomerState",
  default: {},
});
export const deleteCustomerState = atom({
  key: "deleteCustomerState",
  default: [],
});
export const isPriceCalculatedState = atom({
  key: "isPriceCalculatedState",
  default: false,
});
export const insurancePriceState = atom({
  key: "insurancePriceState",
  default: "",
});
