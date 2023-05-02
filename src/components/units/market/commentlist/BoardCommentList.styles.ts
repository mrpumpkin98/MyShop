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
  padding-top: 30px;
  height: 128px;
  padding-left: 100px;
  display: flex;
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  width: 100%;
  padding-right: 30px;
  margin-top: 10px;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
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
export const Writer = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
export const Contents = styled.div`
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
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  color: #bdbdbd;
`;

export const Delete = styled(DeleteOutlined)`
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  color: #bdbdbd;
`;

export const DateString = styled.div`
  color: lightgray;
  padding-top: 15px;
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

export const WapperBoardCommentWrite = styled.div`
  padding-left: 100px;
`;

export const RightSquare = styled(RightSquareOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: gold;
  padding-top: 25px;
`;
