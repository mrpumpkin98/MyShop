import { useRouter } from "next/router";
import BoardCommentListUIItem from "./BoardCommentList.presenterItem";
import type { IBoardCommentListUIProps } from "./BoardCommentList.types";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "@apollo/client";
import {
  FETCH_USED_ITEM_QUESTIONS,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
} from "./BoardCommentList.queries";

export default function BoardCommentListUI(props: any): JSX.Element {
  return (
    <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={false}>
      {props.data?.fetchUseditemQuestions.map((el: any) => (
        <>
          <BoardCommentListUIItem key={el._id} el={el} />
        </>
      )) ?? <></>}
    </InfiniteScroll>
  );
}
