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

export const Wrapper = styled.div`
  border-bottom: 1px solid #bdbdbd;
`;

export const ItemWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  height: 128px;
`;

export const AnswerItemWrapper = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  width: 100%;
  padding-right: 30px;
  margin-top: 10px;
  align-items: start;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;
export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Writer = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
export const Contents = styled.p`
  font-size: 14px;
  margin-top: 10px;
  width: 100%;
`;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

export const Edit = styled(EditOutlined)`
  font-size: 15px;
  cursor: pointer;
  margin-left: 10px;
  color: #858e96;
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

export const Delete = styled(DeleteOutlined)`
  font-size: 15px;
  cursor: pointer;
  margin-left: 10px;
  color: #858e96;
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

export const DateString = styled.p`
  color: lightgray;
  font-size: 12px;
  padding-top: 5px;
  padding-left: 60px;
`;

export const Star = styled(Rate)`
  padding-left: 20px;
`;

export const PasswordModal = styled(Modal)``;

export const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
`;

// export const BoardCommentCancel = styled.button`
//   margin-bottom: 50px;
// `;

export const WapperBoardCommentWrite = styled.div``;

export const RightSquare = styled(RightSquareOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: white;
  padding-top: 25px;
`;
