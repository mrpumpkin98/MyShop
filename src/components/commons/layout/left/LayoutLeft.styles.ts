import styled from "@emotion/styled";
import {
  ClockCircleOutlined,
  GitlabFilled,
  SmileOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { mobile } from "../../../../commons/styles/breakPoints";

export const Wrapper = styled.div`
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-right: 2px solid black;
  @media ${mobile} {
    width: 100%;
    flex-direction: row;
  }
`;

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  @media ${mobile} {
    flex-direction: row;
  }
`;

export const UserName = styled.p`
  font-size: 18px;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  display: flex;
  margin-left: 10px;
  @media ${mobile} {
    margin-left: 0px;
  }
`;

export const Profile = styled.div`
  padding: 10px;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media ${mobile} {
    border-bottom: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${mobile} {
    flex-direction: row;
  }
`;
export const TimerBox = styled.div`
  display: flex;
  align-items: center;
  @media ${mobile} {
    display: none;
  }
`;

export const OutButton = styled.button`
  width: 150px;
  margin-top: 20px;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
  @media ${mobile} {
    display: none;
  }
`;

export const UserPoint = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: "Arita-SemiBold";
`;

export const Charge = styled.button`
  width: 150px;
  margin-top: 17px;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const Logo = styled.img`
  width: 300px;
  margin-top: 30px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  border-collapse: collapse;
`;

export const Button = styled.button`
  margin: 10px;
  width: 200px;
  font-size: 20px;
  padding: 15px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";

  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const LoginNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const InnerButton = styled.button`
  margin: 10px;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
  &.SignIn {
    background-color: gold;
    :hover {
      background-color: #efc900;
    }
  }
`;

export const BasketWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin: auto;
`;
export const BasketTitle = styled.h1`
  margin: 20px 20px 0px 20px;
  font-weight: 700;
  font-size: 18px;
`;
export const BasketAside = styled.aside``;

export const BasketAsideBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 6px;
  margin-bottom: 10px;
`;
export const BasketAsideTie = styled.div`
  border: 2px solid black;
  width: 156px;
  height: 199px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
`;
export const BasketImg = styled.img`
  width: 60px;
  height: 60px;
`;
export const BasketTie = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 120px;
`;
export const BasketName = styled.p`
  font-size: 12px;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;

export const BasketContents = styled.p`
  font-size: 12px;
  color: #4f4f4f;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;
export const BasketPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;

export const BasketListTags = styled.div``;

export const BasketModal = styled(Modal)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TodayTitle = styled.div`
  font-family: "SCDream4";
  text-align: center;
  font-size: 14px;
  margin: 20px 0px;
`;

export const TodayList = styled.div`
  border: 1px solid #bdbdbd;
  height: 100%;
  width: 184px;
  margin-top: 305px;
  margin-left: 20px;
  border-radius: 8px;
`;

export const TodayTable = styled.div`
  margin: 0px 10px;
`;

export const ReactPaginate = styled.div`
  margin: 0px 10px;
`;

export const PaginationContainer = styled.div`
  /* margin-top: 20px; */
`;

export const Pagination = styled(ReactPaginate)<{
  previousLabel: string;
  nextLabel: string;
  pageCount: any;
  onPageChange: any;
  containerClassName: any;
  previousLinkClassName: any;
  nextLinkClassName: any;
  disabledClassName: any;
  activeClassName: any;
  pageRangeDisplayed: any;
  marginPagesDisplayed: any;
}>`
  /* margin-top: 20px; */
  display: none;
`;
