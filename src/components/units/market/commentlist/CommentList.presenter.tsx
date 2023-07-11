import CommentListUIItem from "./CommentList.presenterItem";
import InfiniteScroll from "react-infinite-scroller";

export default function BoardCommentListUI(props: any): JSX.Element {
  return (
    <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={false}>
      {props.data?.fetchUseditemQuestions.map((el: any) => (
        <>
          <CommentListUIItem key={el._id} el={el} />
        </>
      )) ?? <></>}
    </InfiniteScroll>
  );
}
