import { } from "./BoardList.styles";

export default function BoardListUI(props) {
    console.log(props)
    return (
        <>
            <div>
                {props.data?.fetchBoards.map((el, index) => (
                    //특별한 이유가 없으면 프레그먼트로 감싸는게 효율적이다. <div>는 1개 더 그려야돼서 조금 느려짐
                    //1. 프래그먼트라? <></> , <Fragment></Fragment>
                    //2. 프래그먼트에 key 입력하는 방법 <Fragment key={1}></Fragment>
                    <div key={el._id}>
                        {/* index는 게시글을 삭제할 때, 다음 게시들이 위로 올라오면서 기존의 index와 동일한 값을 갖게 됨, 유일하지 않음 */}
                        <span><input type="checkbox" /></span>
                        <span style={{ margin: "10px" }}>{el._id}</span>
                        <span style={{ margin: "10px" }}>{el.title}</span>
                        <span style={{ margin: "10px" }}>{el.writer}</span>
                        <span><button id={el._id} onClick={props.onClickDelete}>삭제</button></span>
                    </div>
                ))}
            </div>
        </>
    )
}                             