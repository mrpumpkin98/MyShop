import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Money } from "../../../../commons/libraries/utils";
import * as B from "./MypageNavigation.styles";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const onClickMenu = (event: any): void => {
    void router.push(event.currentTarget.id);
    console.log(data);
  };

  const NAVIGATION_MENUS = [
    { name: "내 장터", page: "/MyPage/MyShop" },
    { name: "내 포인트", page: "/MyPage/MyPoint" },
    { name: "내 프로필", page: "/MyPage/MyShop" },
  ];

  return (
    <B.Wrapper>
      <B.WrapperMain>
        <B.Title>MYPAGE</B.Title>
        <B.Smile></B.Smile>
        <B.Name>{data?.fetchUserLoggedIn?.name}</B.Name>
        <B.WrapperPoint>
          <B.PointIcon />
          <B.Point>{Money(data?.fetchUserLoggedIn?.userPoint?.amount)}</B.Point>
        </B.WrapperPoint>
        <B.WrapperMenuItem>
          {NAVIGATION_MENUS.map((el) => (
            <Fragment key={el.page}>
              <B.MenuItem id={el.page} onClick={onClickMenu}>
                {el.name}
              </B.MenuItem>
            </Fragment>
          ))}
        </B.WrapperMenuItem>
      </B.WrapperMain>
    </B.Wrapper>
  );
}
