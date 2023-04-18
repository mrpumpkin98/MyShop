import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  HeartFilled,
} from "@ant-design/icons";
import ReactPlayer from "react-player";

export const Wrapper = styled.div`
  width: 1200px;
  margin: 100px;
`;

export const CardWrapper = styled.div`
  border: 1px solid black;
  padding-top: 10px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 4px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  margin-right: 20px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 830px;
  margin-right: 30px;
`;

export const Environment = styled(EnvironmentOutlined)`
  font-size: 20px;
  color: gold;
  cursor: pointer;
  margin-right: 10px;
`;

export const PaperClip = styled(PaperClipOutlined)`
  font-size: 20px;
  color: gold;
  cursor: pointer;
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
  min-height: 800px;
`;

export const Youtube = styled(ReactPlayer)`
  margin-top: 50px;
  margin-bottom: 30px;
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

export const Like = styled(LikeOutlined)`
  font-size: 25px;
  color: gold;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const DisLike = styled(DislikeOutlined)`
  font-size: 25px;
  color: #bdbdbd;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const LikeNumber = styled.div`
  color: gold;
  font-family: "SCDream4";
`;

export const DisLikeNumber = styled.div`
  color: #bdbdbd;
  font-family: "SCDream4";
`;

export const DisLikeTie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
`;

export const Title = styled.h1`
  padding-top: 50px;
  margin-left: 10px;
  font-family: "Jalnan";
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
  background-color: #f7f8fa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 0px 12px;
  cursor: pointer;
  font-family: "SCDream4";

  :hover {
    background-color: gold;
    border-color: white;
  }
`;

export const Image = styled.img`
  width: 296px;
  height: 296px;
  margin-bottom: 10px;
  margin-top: 30px;
`;

// 중고마켓

export const WidthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperRemarksNamePrice = styled.div``;

export const Remarks = styled.div`
  color: #bdbdbd;
  font-size: 18px;
  font-weight: 500;
  margin: 20px 0px 0px 0px;
`;

export const Name = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin: 10px 0px 0px 0px;
`;

export const Price = styled.div`
  font-weight: 700;
  font-size: 36px;
  margin: 5px 0px 0px 0px;
`;

export const Tags = styled.div`
  font-size: 16px;
  color: #bdbdbd;
  font-weight: 500;
  margin-top: 60px;
  width: 100%;
`;

export const Heart = styled(HeartFilled)`
  font-size: 18px;
  color: gold;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const WrapperPickedCount = styled.div`
  margin: 70px 30px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PickedCount = styled.div``;

export const WrapperContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export const Contents = styled.div`
  margin-top: 60px;
  width: 100%;
`;
