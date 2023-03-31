export default function PaginationUI(props): JSX.Element {
  return (
    <div>
      <span onClick={props.onClickPrevPage}>👈</span>
      {new Array(3).fill("철수").map(
        (_, index) =>
          index + props.startPage <= props.lastPage && (
            <span
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPage}
            >
              {"  "}
              {index + props.startPage}
              {"  "}
            </span>
          )
      )}
      <span onClick={props.onClickNextPage}>👉</span>
    </div>
  );
}
