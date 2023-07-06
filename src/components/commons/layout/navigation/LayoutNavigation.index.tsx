import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { Fragment } from "react";
import * as B from "./LayoutNavigation.styles";
import { Money } from "../../../../commons/libraries/utils";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItems";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todayOpenState } from "../../../../commons/stores";

const SECRET = "@#$%";
interface Props {
  basketItems: any[];
  onErrorImg: (e: any) => void;
}
const ITEMS_PER_PAGE = 2;

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState([]);
  const pageCount = Math.ceil(basketItems.length / ITEMS_PER_PAGE);
  const onClickMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    void router.push(event.currentTarget.id);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [todayItems, setTodayItems] = useState([]);
  const NAVIGATION_MENUS = [
    { name: "상품등록", page: "/Market/Write" },
    { name: "상품목록", page: "/Market" },
  ];
  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS);
  const offset = currentPage * ITEMS_PER_PAGE;
  const todayOpen = useRecoilValue(todayOpenState);
  const setTodayOpen = useSetRecoilState(todayOpenState);
  ///////////////////////////////////////////////////////////////
  // 대체 이미지
  //////////////////////////////////////////////////////////////
  const onErrorImg = (e: any) => {
    e.target.src = "/images/icons/all-icon.png";
  };

  useEffect(() => {
    const todays = JSON.parse(localStorage.getItem("todays") || "[]");
    setTodayItems(todays);
    setTodayOpen(false);
  }, [todayOpen === true]);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  ///////////////////////////////////////////////////////////////
  //  게시물 이동
  //////////////////////////////////////////////////////////////

  const onClickSubmit = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    router.push(`/Market/${event.currentTarget.id}`);
  };

  return (
    <B.Wrapper>
      <B.MenuItemWrapper>
        {NAVIGATION_MENUS.map((el) => (
          <Fragment key={el.page}>
            <B.MenuItem id={el.page} onClick={onClickMenu}>
              {el.name}
            </B.MenuItem>
          </Fragment>
        ))}
        <B.TodayList>
          <B.TodayTitle>오늘 본 상품</B.TodayTitle>
          <B.TodayTable>
            {todayItems.slice(offset, offset + ITEMS_PER_PAGE).map((j: any) => (
              <B.BasketTr key={j._id}>
                <B.BasketListImg
                  src={`https://storage.googleapis.com/${j.images[0]}`}
                  onError={onErrorImg}
                />
                <B.BasketTieTable>
                  <B.BasketListName id={j._id} onClick={onClickSubmit}>
                    {j.name}{" "}
                  </B.BasketListName>
                  <B.BasketListContents id={j._id} onClick={onClickSubmit}>
                    {j.remarks.length > 10
                      ? `${j.remarks.slice(0, 10)}...`
                      : j.remarks}
                  </B.BasketListContents>
                  <B.BasketListPrice id={j._id} onClick={onClickSubmit}>
                    {Money(j.price)}
                  </B.BasketListPrice>
                  <B.BasketListTags id={j._id}>{j.tags}</B.BasketListTags>
                </B.BasketTieTable>
              </B.BasketTr>
            ))}
          </B.TodayTable>
          <B.PaginationContainer>
            <B.Pagination
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
              pageRangeDisplayed={0}
              marginPagesDisplayed={0}
            />
          </B.PaginationContainer>
        </B.TodayList>
      </B.MenuItemWrapper>
    </B.Wrapper>
  );
}
