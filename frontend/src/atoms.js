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
