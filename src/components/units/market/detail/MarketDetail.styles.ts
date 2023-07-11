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

export const Main = styled.main`
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

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 100px;
`;

export const UserBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px 15px;
`;

export const Avatar = styled.img`
  margin-right: 10px;
`;

export const SellerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Seller = styled.p`
  font-size: 16px;
  display: flex;
  font-family: "Arita-SemiBold";
`;

export const SellerText = styled.p`
  font-family: "Arita-SemiBold";
  color: gray;
  font-size: 16px;
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
  font-family: "Arita-SemiBold";
  font-size: 12px;
`;

export const DetailArticle = styled.article`
  width: 100%;
  margin-top: 50px;
  border-top: 2px solid black;
`;

export const Titles = styled.h4`
  font-family: "Arita-SemiBold";
  border-bottom: 1px solid black;
  padding-bottom: 20px;
`;

export const imImageResult = styled.div`
  width: 450px;
  height: 500px;
  background-color: #d4d4d4;
  border-left: 2px solid black;
  border-right: 2px solid black;
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
  height: 55px;
  margin-top: 10px;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  font-family: "Arita-SemiBold";
  font-size: 17px;
  &.List {
    color: white;
    background-color: black;
    border: none;
  }
  &.Buy {
    background-color: gold;
  }
`;

export const Image = styled.img`
  width: 500px;
  height: 500px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

// 중고마켓

export const DetailWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const WrapperRemarksNamePrice = styled.div`
  border-top: 2px solid black;
  width: 450px;
  height: 500px;
  margin-left: 10px;
`;

export const RemarksNamePriceTie = styled.div`
  padding: 0px 20px;
`;

export const Remarks = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
  font-family: "Arita-SemiBold";
`;

export const Name = styled.h2`
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
  font-family: "Arita-SemiBold";
`;

export const Area = styled.p`
  font-family: "Arita-SemiBold";
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
  font-family: "Arita-SemiBold";
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0px 10px;
  border: 2px solid black;
`;

export const Map = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 30px;
  border: 2px solid black;
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

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  padding: 20px 20px 20px 0px;
`;

export const EvaluationWrapper = styled.div`
  border-left: 1px solid black;
  height: auto;
  width: 350px;
  padding: 20px;
`;

export const Contents = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0px 15px;
`;

export const BestArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h3`
  width: 100%;
  font-size: 16px;
  font-family: "Arita-SemiBold";
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
  align-items: center;
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
`;

export const BestPostTitle = styled.div`
  font-weight: 600;
  font-size: 12px;
  font-family: "Arita-SemiBold";
  margin-top: 10px;
`;

export const LikeNum = styled.div`
  font-size: 12px;
`;
