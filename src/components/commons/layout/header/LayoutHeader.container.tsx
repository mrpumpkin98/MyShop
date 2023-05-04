import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useMutation, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import {
  FETCH_POINT_TRANSACTION_COUNT_OF_LOADING,
  FETCH_POINT_TRANSACTION_OF_LOADING,
  FETCH_USER_LOGGED_IN,
} from "./LayoutHeader.queries";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import StaticRoutingPage from "../../../units/board/list/BoardList.container";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./LayoutHeader.queries";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();

  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const userName = data?.fetchUserLoggedIn.name;

  const { data: pointCountData } = useQuery(
    FETCH_POINT_TRANSACTION_COUNT_OF_LOADING
  );
  const { data: pointData } = useQuery(FETCH_POINT_TRANSACTION_OF_LOADING);

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

  //////////////////////////////////////////////////
  // 포인트 충전
  /////////////////////////////////////////////////

  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

  const onclickPayment = async () => {
    console.log(answer);
    const IMP = window.IMP; // 생략 가능
    console.log(IMP);
    IMP.init("imp49910675"); // 예: imp00000000a

    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: "노르웨이 회전 의자",
        amount: 1000000,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/section28/28-01-payment",
      },
      (rsp: any) => {
        // callback
        if (rsp.success === true) {
          // 결제 성공 시 로직,
          const result = createPointTransactionOfLoading({
            variables: {
              impUid: String(rsp.imp_uid),
            },
          });
          console.log(rsp);
          console.log(pointData);
          // 백엔드에 결제관련 데이터 넘겨주기 => 즉 뮤테이션 실행하기
          // createPointTransactionOfLoading
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

  //////////////////////////////////////////////////
  // 포인트 충전 총 값
  /////////////////////////////////////////////////
  const point = pointData?.fetchPointTransactionsOfLoading;
  let answer = 0;

  for (let i = 0; i < point?.length; i++) {
    answer += point[i].amount;
  }

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToSingUp={onClickMoveToSingUp}
      onClickMoveToLogin={onClickMoveToLogin}
      onClickMoveToLogOut={onClickMoveToLogOut}
      userName={userName}
      onclickPayment={onclickPayment}
      pointCountData={pointCountData}
      answer={answer}
    />
  );
}
