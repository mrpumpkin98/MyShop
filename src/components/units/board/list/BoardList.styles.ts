import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  HeartFilled,
} from "@ant-design/icons";

export const Title = styled.h3`
  width: 100%;
  margin-top: 70px;
  font-size: 19px;
  font-family: "Arita-Bold";
`;

export const BestPostsTie = styled.div`
  width: 1100px;
  display: flex;
  cursor: pointer;
  font-family: "SCDream4";
  margin-bottom: 70px;
`;

export const BestPosts = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const BestPostBody = styled.div`
  height: 230px;
  margin: 14px;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 6px;
  &:hover {
    background: rgb(250, 250, 252);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const BestPostImg = styled.img`
  width: 100%;
  height: 54%;
  object-fit: cover;
`;

export const BestPostContent = styled.div`
  display: flex;
`;

export const BestPostTitle = styled.div`
  margin: 10px 0px 15px 15px;
  font-weight: 600;
  font-size: 15px;
`;

export const BestPostInfo = styled.div`
  width: 85%;
  padding-left: 15px;
`;

export const AvatarWriterTie = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 7px;
`;

export const Writer = styled.div`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 2px;
`;

export const CreatedAt = styled.div`
  font-weight: 400;
  font-size: 12px;
  margin-top: 7px;
  color: #828282;
`;

export const LikeTie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Like = styled(HeartFilled)`
  font-size: 15px;
  color: gold;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 200px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const LikeNum = styled.div`
  font-size: 12px;
`;

export const SearchTitle = styled.input`
  width: 776px;
  height: 52px;
  padding-left: 20px;
  margin-top: 60px;
  background: #f2f2f2;
  border: none;
  border-radius: 10px;
`;

export const SearchTime = styled.input`
  width: 244px;
  height: 52px;
  padding-left: 20px;
  margin-top: 60px;
  background: #f2f2f2;
  border: none;
  border-radius: 10px;
`;

export const Body = styled.div`
  display: flex;
  width: 1100px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const BodyWrapper = styled.div`
  font-family: "SCDream4";
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const LabelTie = styled.div`
  width: 100%;
`;

export const Label = styled.div`
  cursor: pointer;
  &.Writer {
    margin-left: 5px;
    font-size: 14px;
  }
  &.Like {
    background-color: gold;
    border-radius: 4px;
    padding: 10px 12px;
    font-size: 13px;
  }
  &.Time {
    font-size: 13px;
    color: gray;
    margin-top: 5px;
  }
  &.Title {
    width: 160px;
    margin-bottom: 5px;
  }
`;

export const Likes = styled(HeartFilled)`
  font-size: 15px;
  color: gold;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  border-radius: 200px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
  margin-top: 10px;
`;

export const LikesNum = styled.p`
  margin-top: 5px;
  font-size: 12px;
`;

export const LikesTie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Pagination = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 30px;
`;

export const ButtonTie = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  height: 25px;
  font-size: 12px;
  background-color: gold;
  border-radius: 4px;
  border: none;
  :hover {
    background-color: #ebc600;
  }
`;

export const Button = styled.button`
  width: 200px;
  height: 45px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  font-family: "SCDream4";

  cursor: pointer;
  :hover {
    background-color: gold;
    border-color: gold;
  }
`;

export const TextToken = styled.span<{ isMatched: boolean }>`
  color: ${(props) => (props.isMatched ? "gold" : "black")};
`;

export const BasketListImg = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 4px;
  background: rgb(250, 250, 252);
  &:hover {
    background: rgb(250, 250, 252);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const InfTie = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleTie = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
