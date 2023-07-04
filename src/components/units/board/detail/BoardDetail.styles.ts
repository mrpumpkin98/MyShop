import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  HeartFilled,
  FrownFilled,
} from "@ant-design/icons";
import ReactPlayer from "react-player";

export const Wrapper = styled.div`
  width: 900px;
  margin-top: 100px;
`;

export const CardWrapper = styled.div`
  border: 1px solid black;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #bdbdbd;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

export const Image = styled.img`
  width: 900px;
  height: 400px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

export const AvatarTie = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconTie = styled.div`
  display: flex;
`;

export const Avatar = styled.img`
  margin-right: 20px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 30px;
`;

export const Environment = styled(EnvironmentOutlined)`
  font-size: 25px;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #858e96;
  width: 50px;
  border-radius: 100px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const PaperClip = styled(PaperClipOutlined)`
  font-size: 25px;
  color: #858e96;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 100px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const Writer = styled.div`
  font-weight: 600;
  font-family: "SCDream4";
`;

export const CreatedAt = styled.div`
  margin-left: 2px;
  color: #bdbdbd;
  font-family: "SCDream4";
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Youtube = styled(ReactPlayer)``;

export const YoutubeBox = styled.div`
  margin-top: 50px;
  margin-bottom: 10px;
`;

export const imImageResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 50px;
`;

export const LikeTie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

export const Like = styled(HeartFilled)`
  font-size: 25px;
  color: gold;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 100px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const DisLike = styled(FrownFilled)`
  font-size: 25px;
  color: #bdbdbd;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 100px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const LikeNumber = styled.div`
  color: gold;
  margin-top: 10px;
  font-weight: 700;
`;

export const DisLikeNumber = styled.div`
  color: #bdbdbd;
  margin-top: 10px;
  font-weight: 700;
`;

export const DisLikeTie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
`;

export const Title = styled.h1`
  padding-top: 50px;
  font-family: "GmarketSansTTFBold";
  font-size: 50px;
`;

export const Contents = styled.div`
  color: #424242;
  margin-top: 50px;
  border: none;
  border-radius: 4px;
  font-family: "SCDream4";
  width: 100%;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 80px;
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  margin: 0px 12px;
  cursor: pointer;
  font-family: "SCDream4";

  :hover {
    background-color: gold;
    border-color: white;
  }
`;
