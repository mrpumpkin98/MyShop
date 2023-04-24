import { Fragment, useEffect, useState } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation.styles";
import type { ILayoutNavigationUIProps } from "./LayoutNavigation.types";
import { NavLink } from "react-router-dom";

const NAVIGATION_MENUS = [
  { name: "자유게시판", page: "/Board" },
  { name: "중고마켓", page: "/Market" },
  { name: "마이페이지", page: "/mypages" },
];

export default function LayoutNavigationUI(
  props: ILayoutNavigationUIProps
): JSX.Element {
  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={props.onClickMenu}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
