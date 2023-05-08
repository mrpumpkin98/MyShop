import { Fragment, useEffect, useState } from "react";
import * as B from "./MypageNavigation.styles";
import type { ILayoutNavigationUIProps } from "./MypageNavigation.types";
import { NavLink } from "react-router-dom";
import { Money } from "../../../../commons/libraries/utils";

const NAVIGATION_MENUS = [
  { name: "내 장터", page: "/MyPage/MyShop" },
  { name: "내 포인트", page: "/MyPage/MyPoint" },
  { name: "내 프로필", page: "/MyPage/MyShop" },
];

export default function LayoutNavigationUI(props: any): JSX.Element {
  return (
    <B.Wrapper>
      <B.WrapperMain>
        <B.Title>MYPAGE</B.Title>
        <B.Smile></B.Smile>
        <B.Name>{props.data?.fetchUserLoggedIn?.name}</B.Name>
        <B.WrapperPoint>
          <B.PointIcon />
          <B.Point>
            {Money(props.data?.fetchUserLoggedIn?.userPoint?.amount)}
          </B.Point>
        </B.WrapperPoint>
        <B.WrapperMenuItem>
          {NAVIGATION_MENUS.map((el) => (
            <Fragment key={el.page}>
              <B.MenuItem id={el.page} onClick={props.onClickMenu}>
                {el.name}
              </B.MenuItem>
            </Fragment>
          ))}
        </B.WrapperMenuItem>
      </B.WrapperMain>
    </B.Wrapper>
  );
}
