import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
