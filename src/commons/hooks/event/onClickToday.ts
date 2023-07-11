import { useRecoilValue, useSetRecoilState } from "recoil";
import { todayOpenState } from "../../stores";
import { IUseditem } from "../../types/generated/types";
import { useRouter } from "next/router";

export const onClickToday = () => {
  const router = useRouter();
  const setTodayOpen = useSetRecoilState(todayOpenState);
  const onClickTodayAndMove = (today: IUseditem) => () => {
    // 1. 기존 장바구니 가져오기
    const todays = JSON.parse(localStorage.getItem("todays") ?? "[]");

    const temp = todays.filter((el: any) => el._id === today._id);
    if (todays.length > 3) {
      todays.pop();
    }

    // 2. 내가 클릭한거 장바구니에 추가하기
    const existingIndex = todays.findIndex((el: any) => el._id === today._id);
    if (existingIndex !== -1) {
      todays.splice(existingIndex, 1);
    }
    todays.unshift(today);

    localStorage.setItem("todays", JSON.stringify(todays));
    setTodayOpen(true);
    router.push(`/Market/${today._id}`);
  };
  return {
    onClickTodayAndMove,
  };
};
