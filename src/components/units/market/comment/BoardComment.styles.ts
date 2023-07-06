import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  ExportOutlined,
} from "@ant-design/icons";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

export const CardWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  font-weight: 500;
  font-size: 18px;
  display: flex;
  margin-bottom: 30px;
`;

export const HeaderTitle = styled.div`
  font-family: "SCDream4";
`;

export const HeaderImage = styled.img`
  margin-right: 20px;
`;

export const InFor = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: end;
  justify-content: end;
`;

export const InForWriter = styled.input`
  background: white;
  border: solid 1px gold;
  width: 180px;
  height: 52px;
  margin-right: 20px;
  padding-left: 20px;
  border-radius: 4px;
  font-family: "SCDream4";
  border: ${(props) => props.Active && "solid 1px #D1D1D3"};
`;

export const InForPassword = styled.input`
  background: white;
  border: solid 1px gold;
  width: 180px;
  height: 52px;
  padding-left: 20px;
  margin-right: 20px;
  border-radius: 4px;
  font-family: "SCDream4";
  border: ${(props) => props.Active && "solid 1px #D1D1D3"};
`;

export const Rate = styled.input``;

export const Export = styled.button``;

export const Scope = styled.img`
  margin-left: 3px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  background: rgb(255, 255, 255);
  border: 2px solid black;
`;

export const BodyInput = styled.input`
  width: 100%;
  height: 50px;
  background: rgb(247, 248, 250);
  border: none;
  border-right: 2px solid black;
  font-family: "Arita-SemiBold";
  border-bottom: ${(props) => props.Active && "solid 1px #D1D1D3"};
  padding: 10px;
  outline: none;
`;

export const BodyNumberTie = styled.div`
  display: flex;
`;
export const BodyNumber = styled.div`
  width: 1100px;
  height: 55px;
  color: #bdbdbd;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  font-family: "SCDream4";
`;

export const BodyButton = styled.button`
  width: 80px;
  border: none;
  background-color: white;
  font-family: "Arita-SemiBold";
  font-size: 12px;
  background-color: gold;
  cursor: pointer;
  background-color: ${(props) => props.Active && "gold"};

  &.No {
    background-color: white;
    border-left: 2px solid black;
  }
`;

export const Footer = styled.div`
  width: 1200;
  display: flex;
  align-items: center;
  padding-bottom: 50px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgb(63 71 77 / 25%);
  margin-bottom: 20px;
  padding-top: 30px;
`;

export const FooterInfoPicture = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  margin-left: 30px;
`;

export const FooterCommentInfor = styled.div`
  width: 1020px;
`;

export const CommentNameScope = styled.div`
  display: flex;
  align-items: center;
`;

export const CommentName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-right: 15px;
  font-family: "SCDream4";
  margin-top: 10px;
`;

export const CommentScope = styled.div``;

export const CommentContent = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 2px;
  margin-right: 20px;
  font-family: "SCDream4";
`;

export const CommentRegistrationTime = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: #bdbdbd;
  font-family: "SCDream4";
`;

export const FooterEditDelete = styled.div`
  margin-bottom: 40px;
`;

export const CommentEdit = styled.img`
  margin-right: 20px;
  cursor: pointer;
`;

export const CommentDelete = styled.img`
  cursor: pointer;
`;
