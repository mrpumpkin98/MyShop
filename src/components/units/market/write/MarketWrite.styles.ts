import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { AimOutlined, GitlabFilled } from "@ant-design/icons";

export const Wrapper = styled.div`
  /* height: 1847px; */
  width: 900px;
  margin: auto;
  padding-top: 80px;
  padding-bottom: 100px;
  padding-left: 102px;
  padding-right: 102px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 25px;
  font-family: "Arita-SemiBold";
  border-bottom: 2px solid black;
  height: 60px;
  margin-bottom: 20px;
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

export const Form = styled.form``;

export const Main = styled.main`
  width: 100%;
`;

export const InputBox = styled.div`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.p`
  padding: 16px 0px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  font-family: "Arita-SemiBold";
`;

export const TagsText = styled.p`
  font-size: 12px;
  color: black;
  margin-top: 10px;
`;

export const InputPrice = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const Error = styled.div`
  font-size: 13px;
  margin-top: 10px;
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

export const UploadBox = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

export const ButtonForm = styled.form``;

export const WrapperReactQuill = styled.div`
  height: 300px;
`;

export const Map = styled.div`
  height: 500px;
`;

export const AddressArticle = styled.article`
  display: flex;
  flex-direction: column;
`;

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export const AddressBox = styled.div`
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

export const MapBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const AddrTitle = styled.span`
  width: 100%;
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
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";
  margin-left: 10px;
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin: 20px 0px;
`;
