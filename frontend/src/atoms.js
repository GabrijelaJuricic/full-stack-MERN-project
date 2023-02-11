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
export const customerByIdState = atom({
  key: "customerByIdState",
  default: [],
});
