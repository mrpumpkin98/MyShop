import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { Rate, Modal } from "antd";

export const Wrapper = styled.div``;

export const CommentArticle = styled.article`
  width: 100%;
  padding-top: 20px;
  height: 128px;
`;

export const AnswerItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: start;
  border: 2px solid black;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
`;

export const CommentWrapper = styled.div`
  width: 100%;
`;

export const InCommentsWrapper = styled.div`
  width: 100%;
`;
export const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 3px 5px 8px;
  border-bottom: 2px solid black;
  background-color: gold;
  &.Blue {
    background-color: #e5e5e5;
  }
`;

export const InCommentBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 3px 5px 8px;
  border-bottom: 2px solid black;
  background-color: gold;
  &.Blue {
    background-color: #e5e5e5;
  }
`;

export const CommentName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  font-family: "Arita-SemiBold";
`;

export const InCommentName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  font-family: "Arita-SemiBold";
`;

export const CommentContents = styled.p`
  font-size: 14px;
  padding: 10px 10px;
  width: 100%;
`;

export const InCommentContents = styled.p`
  font-size: 14px;
  padding: 10px 10px;
  width: 100%;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  border: 2px solid black;
`;
export const UpdateIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
export const DeleteIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin-left: 10px;
`;

export const FormOut = styled(FormOutlined)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  color: #bdbdbd;
`;

export const CommentButton = styled.button`
  font-family: "Arita-SemiBold";
  font-size: 13px;
  padding: 5px;
  border: none;
  background-color: white;
  cursor: pointer;
  &.Edit {
    border-left: 2px solid black;
    border-right: 2px solid black;
    background-color: black;
    color: white;
  }
  &.Go {
    background-color: gold;
  }
`;

export const InCommentButton = styled.button`
  font-family: "Arita-SemiBold";
  font-size: 13px;
  padding: 5px;
  border: none;
  background-color: white;
  cursor: pointer;
  &.Edit {
    border-left: 2px solid black;
    border-right: 2px solid black;
    background-color: black;
    color: white;
  }
  &.Go {
    background-color: gold;
  }
`;

export const DateString = styled.p`
  color: gray;
  font-size: 12px;
  margin-left: 5px;
`;

export const Star = styled(Rate)`
  padding-left: 20px;
`;

export const Modals = styled(Modal)``;

export const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
`;

export const BoardCommentCancel = styled.button`
  margin-bottom: 50px;
`;

export const CommentWriteBox = styled.div``;

export const Arrow = styled.img`
  width: 20px;
  height: 19px;
  margin-right: 10px;
`;
