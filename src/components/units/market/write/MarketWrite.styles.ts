import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { AimOutlined, GitlabFilled } from "@ant-design/icons";

export const Wrapper = styled.div`
  /* height: 1847px; */
  border: 1px solid black;
  margin: auto;
  margin: 50px 100px;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  box-shadow: 0px 0px 10px gray;
`;

export const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  font-family: "Jalnan";
  margin-bottom: 70px;
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
  width: 996px;
`;

export const LoginTie = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  padding: 16px 0px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  font-family: "SCDream4";
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

export const UploadButton = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 50px;
`;

export const ButtonForm = styled.form``;

export const WrapperReactQuill = styled.div`
  height: 500px;
`;

export const Map = styled.div`
  height: 500px;
`;

export const WrapperMapLatLng = styled.div`
  display: flex;
`;

export const WrapperMap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapperGPSAddress = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
  margin-left: 23px;
  justify-content: space-between;
`;

export const WrapperLatLng = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TieLatLng = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Lat = styled.input`
  width: 180px;
  height: 52px;
  font-size: 15px;
  border: 1px solid #dbdbdb;
  padding: 13px 15px 14px;
  margin-right: 20px;
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const Lng = styled.input`
  width: 180px;
  height: 52px;
  font-size: 15px;
  border: 1px solid #dbdbdb;
  padding: 13px 15px 14px;
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const WrapperAddressAddressDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

// export const AimOut = styled(AimOutlined)`
//   color: gold;
//   font-size: 30px;
//   cursor: pointer;
//   margin: 0px 15px;
// `;

export const KaKaoMap = styled.div`
  display: flex;
`;

export const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const AddrTitle = styled.span`
  font-weight: bold;
  display: block;
`;

export const HAddr = styled.div`
  position: absolute;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 2px;
  background-color: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
`;

export const CenterAddr = styled.span`
  display: block;
  margin-top: 2px;
  font-weight: normal;
`;

export const Button = styled.button`
  width: 179px;
  height: 52px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  font-size: 17px;
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
`;
