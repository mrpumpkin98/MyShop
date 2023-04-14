import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

export const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 70px;
  font-size: 36px;
  font-family: "Jalnan";
`;

////////////////////////////////////////////
// 중고 상품 베스트
////////////////////////////////////////////

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
  height: 307px;
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
  font-size: 19px;
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
  font-size: 18px;
  margin-bottom: 2px;
`;

export const CreatedAt = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #828282;
  margin-bottom: 30px;
`;

export const LikeTie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Like = styled(LikeOutlined)`
  font-size: 18px;
  color: gold;
  cursor: pointer;
  margin-bottom: 8px;
`;

export const LikeNum = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

////////////////////////////////////////////
//  중고 상품 리스트
////////////////////////////////////////////

export const List = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 780px;
  margin-top: 50px;
`;

export const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin: auto;
  border-bottom: 1px solid #bdbdbd;
`;

export const Tr = styled.div`
  border-top: 1px solid #bdbdbd;
  width: 100%;
  font-family: "SCDream4";
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: rgb(250, 250, 252);
    box-shadow: 5px 3px 5px 3px rgba(0, 0, 0, 0.1);
  }
`;

export const ListImg = styled.img`
  width: 160px;
  height: 160px;
  margin: 10px 7px;
`;

export const ListName = styled.div`
  font-size: 24px;
`;

export const TieTable = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;
export const ListContents = styled.div`
  height: 20px;
`;
export const ListTags = styled.div`
  height: 20px;
`;
export const ListPickedCount = styled.div`
  width: 18px;
  height: 24px;
`;
export const ListPrice = styled.div`
  width: 150px;
  text-align: end;
  margin: 10px;
`;
export const ListSeller = styled.div`
  width: 45px;
`;

export const TitleListSellerListPickedCount = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ButtonTie = styled.div`
  width: 100%;
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

export const TextToken = styled.span`
  color: ${(props) => (props.isMatched ? "gold" : "black")};
`;
