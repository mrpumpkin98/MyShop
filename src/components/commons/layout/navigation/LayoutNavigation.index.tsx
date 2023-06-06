import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { Fragment } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation.styles";

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();

  const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void router.push(event.currentTarget.id);
  };

  const NAVIGATION_MENUS = [
    { name: "자유게시판", page: "/Board" },
    { name: "중고마켓", page: "/Market" },
    { name: "마이페이지", page: "/MyPage/MyShop" },
  ];

  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={onClickMenu}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
