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
} from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";
import { FETCH_USER_LOGGED_IN } from "../../../../components/commons/layout/header/LayoutHeader.queries";
import { IQuery } from "../../../../commons/types/generated/types";
import Timer from "../../../../commons/timer/01";

export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <Wrapper>
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
              <UserName>{props.userName}님</UserName>
            </TieSmile>
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
