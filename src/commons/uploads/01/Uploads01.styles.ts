import styled from "@emotion/styled";
import { PlusCircleOutlined } from "@ant-design/icons";

export const UploadImage = styled.img`
  width: 170px;
  height: 170px;
  margin-right: 24px;
  cursor: pointer;
`;

export const UploadButton = styled.button`
  width: 170px;
  height: 170px;
  background-color: #fafafd;
  border: 2px solid black;
  margin-right: 24px;
  outline: none;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;

export const Picture = styled(PlusCircleOutlined)`
  font-size: 30px;
  color: black;
`;
