import LayoutBanner from "./banner/LayoutBanner.index";
import LayoutHeader from "./header/LayoutHeader.index";
import LayoutNavigation from "./navigation/LayoutNavigation.index";
import MyPageNavigation from "./mypageNavigation/MypageNavigation.index";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import LayoutBoardNavigation from "./boardNavigation/LayoutBoardNavigation.index";

const Body = styled.div`
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
  const HIDDEN_HEADER = ["/Login", "/Login/SignUp"];
  const HIDDEN_BANNER = ["/Login", "/Login/SignUp", "/Map"];
  const HIDDEN_NAVIGATION = ["/Login", "/Login/SignUp"];
  const MYPAGE = ["/MyPage/MyShop", "/MyPage/MyPoint", "/MyPage/MyProfile"];
  const isHiddenHeader = HIDDEN_HEADER.includes(router.asPath);
  const isHiddenBanner = HIDDEN_BANNER.includes(router.asPath);
  const isHiddenNavigation = HIDDEN_NAVIGATION.includes(router.asPath);
  const isMyPage = MYPAGE.includes(router.asPath);
  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      {!isHiddenBanner && <LayoutBanner />}
      {!isHiddenNavigation && <LayoutNavigation />}
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
