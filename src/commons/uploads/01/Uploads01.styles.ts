import styled from "@emotion/styled";
import { PlusCircleOutlined } from "@ant-design/icons";

export const UploadImage = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 24px;
  cursor: pointer;
`;

export const UploadButton = styled.button`
  width: 78px;
  height: 78px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;

export const Picture = styled(PlusCircleOutlined)`
  font-size: 30px;
  color: gray;
`;
