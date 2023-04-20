import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { GitlabFilled } from "@ant-design/icons";

export const Wrapper = styled.div`
  /* height: 1847px; */
  border: 1px solid black;
  margin: auto;
  margin: 100px;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px #bdbdbd;
  border-radius: 8px;
`;

export const Title = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  color: gold;
  font-family: "Jalnan";
  margin-bottom: 30px;
  cursor: pointer;
`;

export const FireFilledIcon = styled(GitlabFilled)`
  color: gold;
  font-size: 40px;
  cursor: pointer;
  margin-right: 5px;
  :hover {
    color: orange;
  }
`;

export const LoginWrapper = styled.div`
  width: 350px;
`;

export const LoginTie = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const Email = styled.input`
  width: 100%;
  height: 60px;
  font-size: 15px;
  padding: 13px 15px 14px;
  border: none;
  border: 1px solid #dbdbdb;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-family: "SCDream4";
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const Password = styled.input`
  width: 100%;
  height: 60px;
  font-size: 15px;
  padding: 13px 15px 14px;
  border: none;
  border-top: 1px solid #dbdbdb;
  border: 1px solid #dbdbdb;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 8px;
  background-color: gold;
  font-size: 17px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  font-family: "SCDream4";
  :hover {
    background-color: #ebc600;
    font-weight: 700;
  }
`;
