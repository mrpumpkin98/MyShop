import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

export const BestPostsTie = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  font-family: "SCDream4";
`;

export const BestPosts = styled.div`
  width: 100%;
  margin-top: 100px;
`;

export const BestPostBody = styled.div`
  height: 257px;
  margin: 14px;
  background: rgb(250, 250, 252);
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

export const Table = styled.table`
  width: 100%;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  margin: auto;
  margin-top: 40px;
`;

export const Tr = styled.tr`
  font-family: "SCDream4";
  &:hover {
    background: rgb(250, 250, 252);
    color: black;
  }
`;

export const Th = styled.th`
  border-bottom: 1px solid #444444;
  padding: 10px;
  background-color: white;
`;

export const Td = styled.td`
  border-bottom: 1px solid #bdbdbd;
  padding: 10px;
  text-align: center;
  color: #4f4f4f;
  cursor: pointer;
  width: 200px;
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
  background-color: #f7f8fa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-family: "SCDream4";

  cursor: pointer;
  :hover {
    background-color: gold;
    border-color: gold;
  }
`;
