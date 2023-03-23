import {
    Table,
    Tr,
    Th,
    Td,
    ButtonTie,
    Button
}
    from "./BoardList.styles";
import { } from '../../../../commons/libraries/utils'

export default function BoardListUI(props) {
    console.log(props)
    return (
        <div>
            <Table>
                <Tr>
                    <Th>체크박스</Th>
                    <Th>아이디</Th>
                    <Th>제목</Th>
                    <Th>작성자</Th>
                    <Th>삭제</Th>
                </Tr>
                {props.data?.fetchBoards.map((el, index) => (
                    //특별한 이유가 없으면 프레그먼트로 감싸는게 효율적이다. <div>는 1개 더 그려야돼서 조금 느려짐
                    //1. 프래그먼트라? <></> , <Fragment></Fragment>
                    //2. 프래그먼트에 key 입력하는 방법 <Fragment key={1}></Fragment>
                    <Tr key={el._id}>
                        {/* index는 게시글을 삭제할 때, 다음 게시들이 위로 올라오면서 기존의 index와 동일한 값을 갖게 됨, 유일하지 않음 */}
                        <Td><input type="checkbox" /></Td>
                        <Td style={{ margin: "10px" }} id={el._id} onClick={props.onClickSubmit}>{(String(el._id).slice(-4).toUpperCase())}</Td>
                        {/* id={el._id} => el은 배열의 index값이하고 할 수 있고 배열이 만들어지면서 키 값을 통해 클릭시 이동과 각 배열 값과 일치시켜줄 수 있다.*/}
                        <Td style={{ margin: "10px" }} id={el._id} onClick={props.onClickSubmit}>{el.title}</Td>
                        <Td style={{ margin: "10px" }} id={el._id} onClick={props.onClickSubmit}>{el.writer}</Td>
                        <Td><button id={el._id} onClick={props.onClickDelete}>삭제</button></Td>
                    </Tr>
                ))}
            </Table>
            <ButtonTie>
                <Button onClick={props.onClickWrite}>게시물 등록하기</Button>
            </ButtonTie>
        </div>
    )
}                             