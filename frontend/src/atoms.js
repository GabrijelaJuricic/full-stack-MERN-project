import { atom } from "recoil";

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
export const isPriceCalculatedState = atom({
  key: "isPriceCalculatedState",
  default: false,
});
export const customerDetailsState = atom({
  key: "customerDetailsState",
  default: [],
});
export const editCustomersDetailsState = atom({
  key: "editCustomersDetailsState",
  default: [],
});
export const updatedCustomerState = atom({
  key: "updatedCustomerState",
  default: {},
});
export const deleteCustomerState = atom({
  key: "deleteCustomerState",
  default: [],
});
export const insurancePriceState = atom({
  key: "insurancePriceState",
  default: 0,
});
export const customerBirthdateState = atom({
  key: "customerBirthdateState",
  default: null,
});
