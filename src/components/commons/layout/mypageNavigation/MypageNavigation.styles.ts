import {
  DollarOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 1180px;
  width: 538px;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  border-right: 1px solid #f2f2f2;
`;

export const WrapperMain = styled.div`
  margin-top: 80px;
  margin-left: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 40px;
  font-family: "SCDream4";
`;

export const Smile = styled(SmileOutlined)`
  font-size: 80px;
  color: #bdbdbd;
  cursor: pointer;
  margin-bottom: 28px;
`;

export const Name = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
  font-family: "SCDream4";
  margin-top: 20px;
`;

export const WrapperPoint = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 76px;
`;

export const PointIcon = styled(DollarOutlined)`
  font-size: 20px;
  color: gold;
  cursor: pointer;
  margin-right: 5px;
`;

export const Point = styled.div`
  font-weight: 700;
  font-size: 16px;
  font-family: "SCDream4";
`;

export const Shopping = styled(ShoppingCartOutlined)`
  color: #bdbdbd;
  font-size: 30px;
  cursor: pointer;
  margin-left: 10px;
`;

export const WrapperMenuItem = styled.div``;

export const MenuItem = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 23px;
  cursor: pointer;
  font-family: "SCDream4";
  :hover {
    color: orange;
  }
`;
