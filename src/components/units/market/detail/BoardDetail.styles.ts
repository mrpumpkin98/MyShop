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
  width: 1000px;
  margin: 100px;
`;

export const CardWrapper = styled.div`
  border: 1px solid #f5f5f5;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 4px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px #dbdbdb;
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
  width: 630px;
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

export const WrapperImage = styled.div``;

export const imImageResult = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  margin: auto;
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
  border-bottom: 1px solid #bdbdbd;
  height: 200px;
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

export const Image = styled.img`
  width: 100%;
  height: 296px;
  margin: auto;
  border-radius: 8px;
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
  color: white;
  font-weight: 500;
  margin-top: 60px;
  width: 100%;
  display: flex;
`;

export const Tag = styled.div`
  margin-right: 10px;
  background-color: #bdbdbd;
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
  height: 500px;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const Heart = styled(HeartFilled)`
  font-size: 18px;
  color: ${(props: ISubmitButtonProps) =>
    props.Active === false ? " #bdbdbd" : "gold"};
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
