import LayoutBanner from "./banner/LayoutBanner.container";
import LayoutHeader from "./header/LayoutHeader.container";
import LayoutNavigation from "./navigation/LayoutNavigation.container";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const HIDDEN = ["/Login"];

const Body = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ILayoutProps {
  children: JSX.Element;
}
export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  const isHidden = HIDDEN.includes(router.asPath);
  return (
    <>
      {!isHidden && <LayoutHeader />}
      {!isHidden && <LayoutBanner />}
      {!isHidden && <LayoutNavigation />}
      <Body>{props.children}</Body>
    </>
  );
}
