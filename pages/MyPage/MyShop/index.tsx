//####################################################################
//
// MARKET_LIST MAIN
//
//####################################################################

import MyPageList from "../../../src/components/units/mypage/list/BoardList.index";
import MyPageNavigation from "../../../src/components/commons/layout/mypageNavigation/MypageNavigation.index";
import { useAuth } from "../../../src/commons/hooks/customs/useAuth";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MyPageList />
    </div>
  );
}
