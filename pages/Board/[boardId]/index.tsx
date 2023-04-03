//####################################################################
//
// BOARD_DETAIL MAIN
//
//####################################################################

import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container";
import BoardComment from "../../../src/components/units/board/comment/BoardComment.container";
import BoardCommentList from "../../../src/components/units/board/commentlist/BoardCommentList.container";

export default function GraphqlMutationPage() {
  return (
    <div>
      <BoardDetail />
      <BoardComment />
      <BoardCommentList />
    </div>
  );
}
