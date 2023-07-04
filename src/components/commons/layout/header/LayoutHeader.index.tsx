import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { IQuery } from "../../../../commons/types/generated/types";
import { useTimer } from "react-timer-hook";
import { useEffect, useState } from "react";
import StaticRoutingPage from "../../../units/board/list/BoardList.index";
import * as B from "./LayoutHeader.styles";
import Head from "next/head";
import Timer from "../../../../commons/timer/01";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { FETCH_POINT_TRANSACTION_COUNT_OF_LOADING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionCountOfLoading";
import { FETCH_POINT_TRANSACTION_OF_LOADING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfLoading";
import { FETCH_POINT_TRANSACTION_OF_SELLING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfSelling";
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "../../../../commons/hooks/queries/UseQueryFetchPointTransactionOfBuying";
import { FETCH_POINT_TRANSACTION } from "../../../../commons/hooks/queries/UseQueryFetchPointTransaction";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "../../../../commons/hooks/mutations/useMutationCreatePointTransactionOfLoading";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
  const { data: pointDataSelling } = useQuery(
    FETCH_POINT_TRANSACTION_OF_SELLING
  );
  const { data: pointDataBuying } = useQuery(FETCH_POINT_TRANSACTION_OF_BUYING);
  const { data: pointDataTransactions } = useQuery(FETCH_POINT_TRANSACTION);

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
            refetchQueries: [
              {
                query: FETCH_USER_LOGGED_IN,
                variables: { impUid: String(rsp.imp_uid) },
              },
              {
                query: FETCH_POINT_TRANSACTION_OF_LOADING,
                variables: { impUid: String(rsp.imp_uid) },
              },
            ],
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
  // 포인트 충전 값 + 포인트 셀링 값 + 포인트 바잉 값
  /////////////////////////////////////////////////
  const pointTransactions = pointDataTransactions?.fetchPointTransactions;
  const point = pointData?.fetchPointTransactionsOfLoading;
  const sellingPoint = pointDataSelling?.fetchPointTransactionsOfSelling;
  const buyingPoint = pointDataBuying?.fetchPointTransactionsOfBuying;
  let answer = 0;

  for (let i = 0; i < pointTransactions?.length; i++) {
    answer += pointTransactions[i].amount;
  }

  return (
    <B.Wrapper>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>
      </Head>
      <B.InnerWrapper>
        <B.Logo src="/images/icons/로고.png" onClick={onClickLogo} />
        {userName ? (
          <B.WrapperSmile>
            <B.WrapperTimer>
              <B.Clock />
              <Timer />
            </B.WrapperTimer>
            <B.TieSmile>
              <Space>
                <Avatar
                  size={35}
                  style={{ cursor: "pointer", margin: "0px 10px 0px 0px" }}
                  icon={<UserOutlined />}
                  src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`}
                />
              </Space>
              <B.UserName>
                {userName}님
                <B.UserAnswer>
                  포인트{" "}
                  {answer
                    ? `${data?.fetchUserLoggedIn?.userPoint?.amount} P`
                    : ""}
                </B.UserAnswer>
              </B.UserName>
            </B.TieSmile>
            <B.Charge onClick={onclickPayment}>충전</B.Charge>
            <B.OutButton onClick={onClickMoveToLogOut}>로그아웃</B.OutButton>
          </B.WrapperSmile>
        ) : (
          <div>
            <B.InnerButton onClick={onClickMoveToLogin}>로그인</B.InnerButton>
            <B.InnerButton onClick={onClickMoveToSingUp} className="SignUp">
              회원가입
            </B.InnerButton>
          </div>
        )}
      </B.InnerWrapper>
    </B.Wrapper>
  );
}
