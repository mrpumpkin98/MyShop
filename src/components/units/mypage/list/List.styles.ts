import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

export const Wapper = styled.div`
  width: 100%;
  padding: 100px 30px;
`;

export const Title = styled.h2`
  border-bottom: 2px solid black;
  height: 60px;
  margin-bottom: 50px;
  width: 50%;
`;

export const BestPostsTie = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  font-family: "SCDream4";
  margin-bottom: 20px;
`;

export const BestPosts = styled.div`
  width: 100%;
  margin-top: 30px;
`;

export const BestPostBody = styled.div`
  height: 257px;
  margin: 14px;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 20px;
  &:hover {
    background: rgb(250, 250, 252);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const BestPostImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

export const BestPostContent = styled.div`
  display: flex;
`;

export const BestPostTitle = styled.div`
  margin: 10px 0px 15px 15px;
  margin-bottom: 17px;
  font-weight: 600;
  font-size: 17px;
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
`;

export const Like = styled(LikeOutlined)`
  font-size: 18px;
  color: gold;
  cursor: pointer;
  margin-bottom: 8px;
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

export const Table = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const Imges = styled.img`
  width: 200px;
  height: 200px;
  background: rgb(250, 250, 252);
`;

export const Tr = styled.div`
  border: 1px solid #eeeeee;
  margin-top: 20px;
`;

export const Th = styled.th`
  padding: 10px;
  background-color: white;
`;

export const Td = styled.div`
  font-size: 13px;
  font-family: "GmarketSansTTFLight";
  font-weight: bold;
  cursor: pointer;
  &.Name {
    padding: 10px 10px 20px 10px;
  }

  &.Price {
    font-family: "GmarketSansTTFMedium";
    padding: 0px 10px 10px 10px;
  }

  &.Addr {
    border-top: 1px solid #eeeeee;
    padding: 10px 10px 10px 10px;
  }
`;

export const Pagination = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 30px;
`;

export const ButtonTie = styled.div`
  width: 100%;
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
  width: 179px;
  height: 45px;
  margin-left: 1000px;
  margin-top: 30px;
  margin-bottom: 80px;
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

export const TextToken = styled.span<{ isMatched: any }>`
  color: ${(props) => (props.isMatched ? "gold" : "black")};
`;

export const WapperNavi = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const MyProduct = styled.div`
  margin-right: 12px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  font-family: "SCDream4";
  &:hover {
    color: orange;
  }
`;

export const Selected = styled.div`
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  font-family: "SCDream4";
  &:hover {
    color: orange;
  }
`;

export const Environment = styled(EnvironmentOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: #858e96;
  padding-left: 10px;
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  margin: 10px 0px 30px 0px;
`;

export const List = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 780px;
  margin-top: 40px;
  margin-bottom: 50px;
`;
