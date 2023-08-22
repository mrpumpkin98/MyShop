import { atom, selector } from "recoil";
import { getAccessToken } from "../liveries/getAccessToken";

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

export const restoreAccessTokenLoadable = selector({
  key: "useRecoilValueLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
