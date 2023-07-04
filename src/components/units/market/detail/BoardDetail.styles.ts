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
  width: 900px;
  margin: 100px;
`;

export const CardWrapper = styled.div`
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 4px;
  border-radius: 8px;
`;

export const Header = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
  border: 1px solid rebeccapurple;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
`;

export const AvatarInfoWrapper = styled.div`
  display: flex;
`;

export const Avatar = styled.img`
  margin-right: 20px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 630px;
  margin-right: 30px;
`;

export const Environment = styled(EnvironmentOutlined)`
  font-size: 20px;
  color: gold;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
`;

export const PaperClip = styled(PaperClipOutlined)`
  font-size: 20px;
  color: gold;
  cursor: pointer;
`;

export const TooltipWrapper = styled.div``;

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

export const WrapperImage = styled.div``;

export const imImageResult = styled.div`
  width: 500px;
  height: 500px;
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
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #d4d4d4;
  cursor: pointer;
  font-family: "GmarketSansTTFMedium";
  &.List {
    color: white;
    background-color: black;
    border: none;
  }
`;

export const Image = styled.img`
  width: 500px;
  height: 500px;
`;

// 중고마켓

export const WidthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperRemarksNamePrice = styled.div`
  border-top: 2px solid black;
  height: 100%;
`;

export const Remarks = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 30px;
  font-family: "GmarketSansTTFLight";
`;

export const Name = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin-top: 30px;
  font-family: "GmarketSansTTFMedium";
`;

export const Price = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 20px 0px 0px 0px;
  font-family: "GmarketSansTTFMedium";
`;

export const AreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const AreaInformation = styled.p`
  font-weight: 700;
  margin-right: 10px;
  font-family: "GmarketSansTTFLight";
`;

export const Area = styled.p`
  font-family: "GmarketSansTTFLight";
`;

export const AreaTie = styled.div`
  display: flex;
`;

export const Tags = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  width: 100%;
  display: flex;
`;

export const Tag = styled.div`
  margin-right: 10px;
  background-color: gold;
  height: 27px;
  font-size: 13px;
  font-family: "SCDream4";
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0px 10px;
`;

export const Map = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

export const Heart = styled(HeartFilled)<{ Active: any }>`
  font-size: 18px;
  color: ${(props: any) => (props.Active === false ? " #bdbdbd" : "gold")};
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
