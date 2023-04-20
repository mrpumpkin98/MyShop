import styled from "@emotion/styled";
import { GitlabFilled } from "@ant-design/icons";

export const Wrapper = styled.div`
  height: 120px;
  background: rgb(247, 248, 250);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const InnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 35px;
  font-weight: bold;
  font-family: "Jalnan";
  color: gold;
  cursor: pointer;
`;

export const InnerButton = styled.span`
  margin: 10px;
  color: gold;
  cursor: pointer;
  font-family: "Jalnan";
`;

export const FireFilledIcon = styled(GitlabFilled)`
  color: gold;
  font-size: 35px;
  cursor: pointer;
  margin-right: 5px;
  :hover {
    color: orange;
  }
`;

export const Rocket = styled.img`
  margin-right: 5px;
  width: 0px;
  height: 20px;
`;
