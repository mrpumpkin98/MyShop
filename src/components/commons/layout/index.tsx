import LayoutLeft from "./left/LayoutLeft.index";
import LayoutRight from "./right/LayoutRight.index";
import styled from "@emotion/styled";

const Body = styled.div`
  width: 50%;
  height: auto;
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
  return (
    <>
      <Wrapper>
        <LayoutLeft />
        <Body>{props.children}</Body>
        <LayoutRight />
      </Wrapper>
    </>
  );
}
