import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import LayoutNavigationUI from "./MypageNavigation.presenter";
import { FETCH_USER_LOGGED_IN } from "./MypageNavigation.queries";
import { useQuery } from "@apollo/client";

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const onClickMenu = (event: any): void => {
    void router.push(event.currentTarget.id);
    console.log(data);
  };

  return (
    <>
      <LayoutNavigationUI onClickMenu={onClickMenu} data={data} />
    </>
  );
}
