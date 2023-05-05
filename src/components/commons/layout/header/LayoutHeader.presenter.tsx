import { useQuery } from "@apollo/client";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  Wrapper,
  FireFilledIcon,
  UserName,
  Smile,
  WrapperSmile,
  TieSmile,
  WrapperTimer,
  Clock,
  OutButton,
  UserAnswer,
  Charge,
} from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";
import { FETCH_USER_LOGGED_IN } from "../../../../components/commons/layout/header/LayoutHeader.queries";
import { IQuery } from "../../../../commons/types/generated/types";
import Timer from "../../../../commons/timer/01";
import { useRouter } from "next/router";
import Head from "next/head";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <Wrapper>
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
      <InnerWrapper>
        <InnerLogo onClick={props.onClickLogo}>
          {" "}
          <FireFilledIcon />
          Header
        </InnerLogo>
        {props.userName ? (
          <WrapperSmile>
            <WrapperTimer>
              <Clock />
              <Timer />
            </WrapperTimer>
            <TieSmile>
              <Smile />
              <UserName>
                {props.userName}님
                <UserAnswer>
                  포인트{" "}
                  {props.answer
                    ? `${props.data?.fetchUserLoggedIn?.userPoint?.amount} P`
                    : ""}
                </UserAnswer>
              </UserName>
            </TieSmile>
            <Charge onClick={props.onclickPayment}>충전</Charge>
            <OutButton onClick={props.onClickMoveToLogOut}>로그아웃</OutButton>
          </WrapperSmile>
        ) : (
          <div>
            <InnerButton onClick={props.onClickMoveToLogin}>로그인</InnerButton>
            <InnerButton onClick={props.onClickMoveToSingUp}>
              회원가입
            </InnerButton>
          </div>
        )}
      </InnerWrapper>
    </Wrapper>
  );
}
