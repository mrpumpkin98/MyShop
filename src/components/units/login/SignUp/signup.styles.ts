import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { GitlabFilled } from "@ant-design/icons";

export const Wrapper = styled.div`
  border: 1px solid black;
  height: 100vh;
  margin: auto;
  padding-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
`;

export const Form = styled.form``;

export const Title = styled.div`
  font-size: 40px;
  margin-top: 80px;
  color: gold;
  font-family: "Jalnan";
  margin-bottom: 10px;
  text-align: center;
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

export const SignUpWrapper = styled.div`
  width: 450px;
`;

export const SignUpBox = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  margin-bottom: 8px;
  margin-top: 8px;
  margin-left: 3px;
  font-weight: 600;
  font-family: "Arita-SemiBold";
`;

export const Error = styled.div`
  font-size: 15px;
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

export const Logo = styled.img`
  width: 250px;
  cursor: pointer;
`;
