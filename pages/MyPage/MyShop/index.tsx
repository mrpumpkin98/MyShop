//####################################################################
//
// MyShop
//
//####################################################################

import MyPageList from "../../../src/components/units/mypage/list/List.index";
import { useAuth } from "../../../src/commons/hooks/customs/useAuth";

export default function GraphqlMutationPage() {
  useAuth();
  return (
    <div>
      <MyPageList />
    </div>
  );
}
