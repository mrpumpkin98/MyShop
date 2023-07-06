import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const onErrorImg = atom({
  key: "onErrorImg",
  default: (e: any) => {
    e.target.src = "/images/avatar.png";
  },
});

export const todayOpenState = atom({
  key: "todayOpenState",
  default: false,
});

export const editComment = atom({
  key: "editComment",
  default: false,
});
