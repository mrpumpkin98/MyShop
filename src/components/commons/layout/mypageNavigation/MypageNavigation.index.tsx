import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Money } from "../../../../commons/libraries/utils";
import * as B from "./MypageNavigation.styles";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const onClickMenu = (event: any): void => {
    void router.push(event.currentTarget.id);
    console.log(data?.fetchUserLoggedIn?.picture);
  };

  const NAVIGATION_MENUS = [
    { name: "상품내역", page: "/MyPage/MyShop" },
    { name: "포인트내역", page: "/MyPage/MyPoint" },
    { name: "회원정보수정", page: "/MyPage/MyProfile" },
  ];

  return (
    <B.Wrapper>
      <B.WrapperMain>
        <B.Title>MYPAGE</B.Title>
        <Space>
          <Avatar
            size={100}
            style={{ cursor: "pointer" }}
            icon={<UserOutlined />}
            src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`}
          />
        </Space>
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
