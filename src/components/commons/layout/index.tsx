import LayoutBanner from "./banner/LayoutBanner.index";
import LayoutHeader from "./header/LayoutHeader.index";
import LayoutNavigation from "./navigation/LayoutNavigation.index";
import MyPageNavigation from "./mypageNavigation/MypageNavigation.index";

import styled from "@emotion/styled";
import { useRouter } from "next/router";

const HIDDEN = ["/Login", "/Login/SignUp"];
const MYPAGE = ["/MyPage/MyShop", "/MyPage/MyPoint", "/MyPage/MyProfile"];

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
