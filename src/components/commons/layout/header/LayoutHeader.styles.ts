import styled from "@emotion/styled";
import {
  ClockCircleOutlined,
  GitlabFilled,
  SmileOutlined,
} from "@ant-design/icons";

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
  :hover {
    color: orange;
  }
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

export const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  font-family: "Jalnan";
  color: gold;
  cursor: pointer;
  display: flex;
`;

export const Smile = styled(SmileOutlined)`
  color: gold;
  font-size: 30px;
  cursor: pointer;
  margin-right: 10px;
`;

export const TieSmile = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid gold;
  margin-right: 8px;
`;

export const WrapperSmile = styled.div`
  display: flex;
  align-items: center;
`;
export const WrapperTimer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

export const Clock = styled(ClockCircleOutlined)`
  margin-right: 7px;
  font-size: 18px;
  padding-top: 3px;
  color: #ffd600;
`;

export const OutButton = styled.span`
  margin: 10px;
  color: #828282;
  cursor: pointer;
  font-family: "Jalnan";
  :hover {
    color: #4f4f4f;
  }
`;

export const UserAnswer = styled.div`
  color: #555555;
  margin-left: 10px;
`;

export const Charge = styled.div`
  font-family: "Jalnan";
  cursor: pointer;
  color: #828282;
  margin: 0px 10px;
  :hover {
    color: #4f4f4f;
  }
`;
