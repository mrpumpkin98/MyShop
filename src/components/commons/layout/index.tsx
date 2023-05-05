import LayoutBanner from "./banner/LayoutBanner.container";
import LayoutHeader from "./header/LayoutHeader.container";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
import MyPageNavigation from "./mypageNavigation/MypageNavigation.container";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Wrapper } from "./banner/LayoutBanner.styles";

const HIDDEN = ["/Login", "/Login/SignUp"];
const MYPAGE = ["/MyPage/MyShop"];

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

interface ILayoutProps {
  children: JSX.Element;
}
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const isHidden = HIDDEN.includes(router.asPath);
  const isMyPage = MYPAGE.includes(router.asPath);
  return (
    <>
      {!isHidden && <LayoutHeader />}
      {!isHidden && <LayoutBanner />}
      {!isHidden && <LayoutNavigation />}
      {isMyPage ? (
        <Wrapper>
          <MyPageNavigation />
          <Body>{props.children}</Body>
        </Wrapper>
      ) : (
        <Body>{props.children}</Body>
      )}
    </>
  );
}
