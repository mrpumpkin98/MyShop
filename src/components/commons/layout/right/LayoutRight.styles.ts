import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: auto;
  width: 25%;
  border-left: 2px solid black;
  background-color: white;
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.button`
  width: 184px;
  font-size: 18px;
  padding: 15px 20px;
  margin: 10px 0px;
  border-radius: 4px;
  transition: background-color 0.3s;
  transition: color 0.3s;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
    color: black;
  }
  &.SignIn {
    background-color: gold;
    :hover {
      background-color: #efc900;
    }
  }
`;

export const TodayProduct = styled.article`
  border: 2px solid black;
  width: 184px;
  margin-top: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px gray;
`;

export const TodayTitle = styled.div`
  font-family: "Arita-SemiBold";
  text-align: center;
  font-size: 19px;
  margin: 20px 0px;
`;

export const TodayWrapper = styled.div`
  margin: 0px 10px;
`;

export const ReactPaginate = styled.div`
  margin: 0px 10px;
`;

export const PaginationBox = styled.div`
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

export const TodayBox = styled.div`
  border: 2px solid black;
  border-radius: 4px;
  width: 156px;
  height: 199px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3px;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
`;
export const TodayBoxImg = styled.img`
  width: 90px;
  height: 90px;
`;
export const TodayAside = styled.aside`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 120px;
`;
export const TodayName = styled.p`
  font-size: 16px;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;

export const TodayContents = styled.p`
  font-size: 12px;
  color: #4f4f4f;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;
export const TodayPrice = styled.p`
  font-size: 15px;
  cursor: pointer;
  font-family: "Arita-SemiBold";
`;

export const BasketListTags = styled.div``;
