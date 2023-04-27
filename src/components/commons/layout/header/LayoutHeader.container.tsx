import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN } from "./LayoutHeader.queries";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import StaticRoutingPage from "../../../units/board/list/BoardList.container";

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const userName = data?.fetchUserLoggedIn.name;

  const onClickLogo = (): void => {
    void router.push("/Board");
    console.log(data);
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/Login");
  };

  const onClickMoveToSingUp = (): void => {
    void router.push("/Login/SignUp");
  };

  const onClickMoveToLogOut = (): void => {
    void router.push("/Login");
    localStorage.removeItem("expiryTimestamp");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("baskets");
    localStorage.removeItem("todays");
    setShouldReload(true);
  };

  //////////////////////////////////////////////////
  // 로그아웃 클릭시 페이지 이동해서 한번 새로고침
  /////////////////////////////////////////////////

  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToSingUp={onClickMoveToSingUp}
      onClickMoveToLogin={onClickMoveToLogin}
      onClickMoveToLogOut={onClickMoveToLogOut}
      userName={userName}
    />
  );
}
