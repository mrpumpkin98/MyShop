import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import * as B from "./LayoutLeft.styles";
import Head from "next/head";
import Timer from "../../../../commons/timer/01";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { FETCH_POINT_TRANSACTION } from "../../../../commons/hooks/queries/UseQueryFetchPointTransaction";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Money } from "../../../../commons/libraries/utils";
import { useErrorImg } from "../../../../commons/hooks/customs/useErroImg";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const userName = data?.fetchUserLoggedIn.name;
  const [basketItems, setBasketItems] = useState([]);
  const { data: pointDataTransactions } = useQuery(FETCH_POINT_TRANSACTION);

  const onClickCharge = (): void => {
    void router.push("/Charge");
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/Login");
  };

  const onClickMoveToSingUp = (): void => {
    void router.push("/Login/SignUp");
  };

  const onClickMyPage = (): void => {
    void router.push("/MyPage/MyProfile");
  };

  const onClickMoveToLogOut = (): void => {
    void router.push("/Login");
    localStorage.removeItem("expiryTimestamp");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("baskets");
    localStorage.removeItem("todays");
    setShouldReload(true);
  };

  //  < 로그아웃 클릭시 페이지 이동해서 한번 새로고침 >

  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  // < 포인트 충전 값 + 포인트 셀링 값 + 포인트 바잉 값 >

  const pointTransactions = pointDataTransactions?.fetchPointTransactions;
  let answer = 0;

  for (let i = 0; i < pointTransactions?.length; i++) {
    answer += pointTransactions[i].amount;
  }

  const onClickBasketModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  // 주소 모달 확인 / 취소 입력

  const Ok = (): void => {
    setIsOpen(false);
  };

  const Cancel = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, [isOpen]);

  return (
    <B.Wrapper>
      {isOpen && (
        <B.BasketModal visible={true} onOk={Ok} onCancel={Cancel}>
          <B.BasketWrapper>
            <B.BasketTitle>장바구니</B.BasketTitle>
            <B.BasketAside>
              <B.BasketAsideBox>
                {basketItems.map((j: any) => (
                  <B.BasketAsideTie key={j._id}>
                    <B.BasketImg
                      src={`https://storage.googleapis.com/${j.images[0]}`}
                      onError={useErrorImg}
                    />
                    <B.BasketTie>
                      <B.BasketName id={j._id}>{j.name}</B.BasketName>
                      <B.BasketContents id={j._id}>
                        {j.remarks}
                      </B.BasketContents>
                      <B.BasketPrice id={j._id}>{Money(j.price)}</B.BasketPrice>
                    </B.BasketTie>
                  </B.BasketAsideTie>
                ))}
              </B.BasketAsideBox>
            </B.BasketAside>
          </B.BasketWrapper>
        </B.BasketModal>
      )}
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
      <B.Main>
        <B.Logo src="/images/icons/로고.png" />
        {userName ? (
          <B.Nav>
            <B.TimerBox>
              <Timer />
            </B.TimerBox>
            <B.Profile>
              <Space>
                <Avatar
                  size={35}
                  style={{ cursor: "pointer" }}
                  icon={<UserOutlined />}
                  src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`}
                />
              </Space>
              <B.UserName>{userName}님 환영합니다</B.UserName>
            </B.Profile>
            <B.UserPoint>
              포인트 :{" "}
              {answer
                ? `${data?.fetchUserLoggedIn?.userPoint?.amount} P`
                : "0 P"}
            </B.UserPoint>
            <B.OutButton onClick={onClickCharge}>포인트 충전</B.OutButton>
            <B.OutButton onClick={onClickBasketModal}>장바구니</B.OutButton>
            <B.OutButton onClick={onClickMyPage}>마이페이지</B.OutButton>
            <B.OutButton onClick={onClickMoveToLogOut}>로그아웃</B.OutButton>
          </B.Nav>
        ) : (
          <B.LoginNav>
            <B.InnerButton onClick={onClickMoveToLogin} className="SignIn">
              로그인
            </B.InnerButton>
            <B.InnerButton onClick={onClickMoveToSingUp} className="SignUp">
              회원가입
            </B.InnerButton>
          </B.LoginNav>
        )}
      </B.Main>
    </B.Wrapper>
  );
}
