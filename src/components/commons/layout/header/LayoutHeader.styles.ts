import styled from "@emotion/styled";
import {
  ClockCircleOutlined,
  GitlabFilled,
  SmileOutlined,
} from "@ant-design/icons";

export const Wrapper = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
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
  font-size: 25px;
  font-weight: bold;
  font-family: "Jalnan";
  color: gold;
  cursor: pointer;
`;

export const InnerButton = styled.span`
  margin: 10px;
  font-family: "Arita-SemiBold";
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  :hover {
    background-color: #e7e7e7;
  }
  &.SignUp {
    background-color: gold;
    border-radius: 4px;
    padding: 10px 20px;
    :hover {
      background-color: #efc900;
    }
  }
`;

export const FireFilledIcon = styled(GitlabFilled)`
  color: gold;
  font-size: 30px;
  cursor: pointer;
  margin-right: 5px;
`;

export const Rocket = styled.img`
  margin-right: 5px;
  width: 0px;
  height: 20px;
`;

export const UserName = styled.p`
  font-size: 15px;
  font-family: "GmarketSansTTFMedium";
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
  border-bottom: 2px solid gold;
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
  cursor: pointer;
  font-family: "Arita-SemiBold";
  font-size: 15px;
  transition: background-color 0.3s;
  padding: 10px 20px;
  border-radius: 4px;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const UserAnswer = styled.div`
  color: #555555;
  margin-left: 10px;
`;

export const Charge = styled.div`
  font-family: "Arita-SemiBold";
  font-size: 15px;
  cursor: pointer;
  margin: 0px 5px;
  transition: background-color 0.3s;
  padding: 10px 20px;
  border-radius: 4px;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const Logo = styled.img`
  width: 130px;
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  width: 200px;
  height: 50px;
  margin-top: 30px;
  cursor: pointer;
`;
