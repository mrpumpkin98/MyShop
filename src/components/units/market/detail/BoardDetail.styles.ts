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
  padding-bottom: 20px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 100px;
`;

export const AvatarInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px 15px;
`;

export const Avatar = styled.img`
  margin-right: 10px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Seller = styled.p`
  font-size: 13px;
  display: flex;
  font-family: "GmarketSansTTFLight";
`;

export const SellerText = styled.p`
  font-weight: 700;
  font-family: "GmarketSansTTFLight";
  margin-right: 10px;
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

export const Prices = styled.p`
  font-family: "GmarketSansTTFLight";
  font-size: 12px;
`;

export const Body = styled.div`
  width: 100%;
  margin-top: 50px;
  border-top: 2px solid black;
`;

export const BodyTitle = styled.p`
  font-family: "GmarketSansTTFLight";
  border-bottom: 1px solid #e4e4e4;
  font-weight: 700;
  padding-bottom: 20px;
`;

export const imImageResult = styled.div`
  width: 450px;
  height: 500px;
  background-color: #d4d4d4;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 50px;
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
  margin-top: 20px;
`;

export const WrapperRemarksNamePrice = styled.div`
  border-top: 2px solid black;
  width: 450px;
  height: 100%;
  margin-left: 10px;
`;

export const RemarksNamePriceTie = styled.div`
  padding: 0px 20px;
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
  border: 1px solid #bdbdbd;
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
  width: 550px;
  border-right: 1px solid #e4e4e4;
  padding: 20px 20px 20px 0px;
`;

export const CommentWrapper = styled.div`
  width: 350px;
  padding: 20px;
`;

export const Contents = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const BestNav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h3`
  width: 100%;
  font-size: 16px;
  font-family: "GmarketSansTTFLight";
  justify-content: space-between;
`;

export const BestPostsTie = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`;

export const BestPosts = styled.div`
  width: 200px;
  margin-top: 20px;
`;

export const BestPostBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BestPostImgBox = styled.div`
  overflow: hidden;
  height: 160px;
  width: 200px;
`;

export const BestPostImg = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
`;

export const BestPostTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  font-family: "GmarketSansTTFLight";
  margin-top: 10px;
`;

export const LikeNum = styled.div`
  font-size: 12px;
`;
