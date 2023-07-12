import styled from "@emotion/styled";
import {
  LikeOutlined,
  DislikeOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  HeartFilled,
  ShoppingFilled,
  ShoppingCartOutlined,
  MehFilled,
  UserOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Box = styled.div`
  width: 900px;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 70px;
  font-size: 36px;
`;

////////////////////////////////////////////
// 중고 상품 베스트
////////////////////////////////////////////

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Shopping = styled(ShoppingFilled)`
  color: #bdbdbd;
  font-size: 18px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  border-radius: 200px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
  margin-left: 15px;
`;

////////////////////////////////////////////
//  중고 상품 리스트
////////////////////////////////////////////

export const Main = styled.main`
  overflow-y: auto;
  width: 100%;
  height: 780px;
  margin-top: 40px;
  margin-bottom: 50px;
`;

export const ListWrapper = styled.div`
  width: 100%;
  border-collapse: collapse;
  border-bottom: 1px solid #bdbdbd;
  padding: 10px;
`;

export const ListBox = styled.div`
  background: #f5f5f5;
  border: 2px solid black;
  width: 100%;
  font-family: "Arita-SemiBold";
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  margin: 15px 0px;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 10px rgba(0.2, 0.2, 0.2, 0.2);
  }
`;

export const ListImgBox = styled.div`
  width: 160px;
  height: 160px;
  margin: 10px 7px;
  margin-left: 15px;
  border-radius: 4px;
  background-color: white;
`;

export const ListImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 4px;
  background-color: white;
`;

export const ListName = styled.p`
  font-size: 30px;
  font-family: "Arita-SemiBold";
`;

export const ListContentsBox = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  padding: 0px 15px;
`;
export const ListRemarks = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: #828282;
  margin: 10px 0px 0px 4px;
  font-family: "Arita-SemiBold";
`;
export const ListTags = styled.p`
  height: 20px;
`;
export const LikePickedCount = styled.p`
  width: 18px;
  height: 24px;
  padding-top: 6px;
  font-family: "Arita-SemiBold";
  margin-left: 5px;
`;
export const ListPrice = styled.div`
  width: 200px;
  text-align: end;
  margin-right: 20px;
  font-weight: 500;
  font-size: 20px;
  font-family: "Arita-SemiBold";
  padding-right: 10px;
`;
export const ListSeller = styled.p`
  width: 100px;
  margin-top: 5px;
  font-family: "Arita-SemiBold";
`;

export const ListSellerBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Like = styled(HeartFilled)`
  font-size: 16px;
  color: gold;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  border-radius: 200px;
  background-color: #f8f9fa;
  border: 1px solid #e9ecee;
`;

export const Smile = styled(SmileOutlined)`
  font-size: 25px;
  color: #bdbdbd;
  cursor: pointer;
  margin-right: 10px;
  :hover {
    color: #aaaaaa;
  }
`;

export const SearchBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  font-family: "SCDream4";
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
  :hover {
    background-color: gold;
    border-color: gold;
  }
`;

export const TextToken = styled.span<{ isMatched: boolean }>`
  color: ${(props) => (props.isMatched ? "gold" : "black")};
`;

////////////////////////////////////////////
// 비회원 장바구니
////////////////////////////////////////////

export const ShoppingBasket = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin: auto;
`;
export const BasketTitle = styled.div`
  margin: 20px 20px 0px 20px;
  font-weight: 700;
  font-size: 18px;
`;
export const BasketList = styled.div``;
export const BasketTable = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 6px;
  margin-bottom: 10px;
`;
export const BasketTr = styled.div`
  border: 1px solid #bdbdbd;
  width: 156px;
  height: 199px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3px;
  margin-bottom: 10px;
`;
export const BasketListImg = styled.img`
  width: 60px;
  height: 60px;
`;
export const BasketTieTable = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 120px;
`;
export const BasketListName = styled.div`
  font-size: 12px;
  cursor: pointer;
`;

export const BasketListContents = styled.div`
  font-size: 12px;
  color: #4f4f4f;
  cursor: pointer;
`;
export const BasketListPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const BasketListTags = styled.div``;

export const AddressModal = styled(Modal)`
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

////////////////////////////////////////////
//  베스트 광고
////////////////////////////////////////////

export const BestWrapper = styled.div`
  display: flex;
  padding: 40px 90px;
  justify-content: space-between;
  background-color: black;
`;

export const BestContent = styled.div``;

export const BestTitle = styled.h2`
  font-size: 60px;
  font-family: "GmarketSansTTFBold";
  margin-top: 30px;
  color: white;
`;

export const BestLabel = styled.p`
  font-size: 25px;
  margin-top: 10px;
  font-family: "GmarketSansTTFMedium";
  color: white;
`;

export const BestImg = styled.img`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 4px;
`;
