import styled from "@emotion/styled";
import { PlusCircleOutlined } from "@ant-design/icons";

export const UploadImage = styled.img`
  width: 100%;
  height: 200px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
`;

export const UploadButton = styled.button`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  background-color: #bdbdbd;
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
