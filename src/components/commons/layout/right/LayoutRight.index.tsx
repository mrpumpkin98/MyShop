import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import { Fragment } from "react";
import * as B from "./LayoutRight.styles";
import { Money } from "../../../../commons/libraries/utils";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItems";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todayOpenState } from "../../../../commons/stores";
import { useErrorImg } from "../../../../commons/hooks/customs/useErroImg";

const ITEMS_PER_PAGE = 2;

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [todayItems, setTodayItems] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const offset = currentPage * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(basketItems.length / ITEMS_PER_PAGE);
  const todayOpen = useRecoilValue(todayOpenState);
  const setTodayOpen = useSetRecoilState(todayOpenState);

  // < 상품 등록 >

  const onClickWrite = (): void => {
    void router.push("/Market/Write");
  };

  // < 상품 목록 >

  const onClickMarket = (): void => {
    void router.push("/Market");
  };

  useEffect(() => {
    const todays = JSON.parse(localStorage.getItem("todays") || "[]");
    setTodayItems(todays);
    setTodayOpen(false);
  }, [todayOpen === true]);

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  //  < 게시물 이동 >

  const onClickSubmit = (event: React.MouseEvent<HTMLTableDataCellElement>) => {
    router.push(`/Market/${event.currentTarget.id}`);
  };

  return (
    <B.Wrapper>
      <B.MenuWrapper>
        <B.Nav>
          <B.MenuItem onClick={onClickWrite}>상품등록</B.MenuItem>
          <B.MenuItem onClick={onClickMarket}>상품목록</B.MenuItem>
        </B.Nav>
        <B.TodayProduct>
          <B.TodayTitle>오늘 본 상품</B.TodayTitle>
          <B.TodayWrapper>
            {todayItems.slice(offset, offset + ITEMS_PER_PAGE).map((j: any) => (
              <B.TodayBox key={j._id}>
                <B.TodayBoxImg
                  src={`https://storage.googleapis.com/${j.images[0]}`}
                  onError={useErrorImg}
                />
                <B.TodayAside>
                  <B.TodayName id={j._id} onClick={onClickSubmit}>
                    {j.name}{" "}
                  </B.TodayName>
                  <B.TodayContents id={j._id} onClick={onClickSubmit}>
                    {j.remarks.length > 10
                      ? `${j.remarks.slice(0, 10)}...`
                      : j.remarks}
                  </B.TodayContents>
                  <B.TodayPrice id={j._id} onClick={onClickSubmit}>
                    {Money(j.price)}
                  </B.TodayPrice>
                </B.TodayAside>
              </B.TodayBox>
            ))}
          </B.TodayWrapper>
          <B.PaginationBox>
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
          </B.PaginationBox>
        </B.TodayProduct>
      </B.MenuWrapper>
    </B.Wrapper>
  );
}
