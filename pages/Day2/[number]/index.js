import { useState } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import { useRouter } from 'next/router'
//==============================================>게시물 수정
import {
    Wrapper,
    Container,
    //--------------------> Box :)
    InPutBox,
    WriterPasswordBox,
    HeaderBox,
    AddressBox,
    YoutubeBox,
    AttachPicturesBox,
    MainSettingBox,
    RegistrationBox,
    //--------------------> 기타 :)
    Title,
    Label,
    Writer,
    Password,
    ZipButton,
    Pictures,
    RadioButton,
    RadioLabel,
    SubmitButton,
    CancelButton,
    PicturesOut,
    RadioOut,
    Error,
    //--------------------> Text :)
    WriterText,
    PasswordText,
    TitleText,
    ContentsText,
    ZipText,
    AddressText,
    YoutubeText,
} from "../../../styles/Day2";

const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number){
        number
        writer
        title
        contents
        }
    }
`

const UPDATE_BOARD = gql`
        mutation updateBoard($number: Int,$writer: String, $title: String, $contents: String){
        createBoard(number: $number, writer: $writer, title: $title, contents: $contents){
            _id
            number
            message
        }
    }
`

export default function BoardsNewPage() {

    const router = useRouter()

    console.log(router)

    const { data } = useQuery(FETCH_BOARD, {
        variables: { number: Number(router.query.number) }
    })
    console.log(data)
    console.log(data)


    //##########################################################
    //  입력 / 에러 선언
    //##########################################################

    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [zip, setZip] = useState("07250")
    const [youtube, setYoutube] = useState("")
    const [writerError, setWriterError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [titleError, setTitleError] = useState("")
    const [contentsError, setContentsError] = useState("")
    const [zipError, setZipError] = useState("")

    //##########################################################
    //  CREATE_BOARD
    //##########################################################

    const [updateBoard] = useMutation(UPDATE_BOARD)


    //##########################################################
    //  INPUT 입력 값에 따른 이벤트
    //##########################################################

    function onWriter(event) {
        setWriter(event.target.value)
        if (event.target.value !== "") {
            setWriterError("")
        }
        if (String(event.target.value).split('').length < 1) {
            setWriterError("필수 정보입니다.")
        }
        if (String(event.target.value).split('').length > 0 && String(event.target.value).split('').length < 2) {
            setWriterError("2자 이상 적어주세요.")
        }
    }

    function onPassword(event) {
        setPassword(event.target.value)
        if (event.target.value !== "") {
            setPasswordError("")
        }
        if (String(event.target.value).split('').length < 1) {
            setPasswordError("필수 정보입니다.")
        }
        // if (String(event.target.value).split('').length > 0 && String(event.target.value).split('').length < 9) {
        //     setPasswordError("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        // }
        // if (String(event.target.value).split('').length > 8) {
        //     setPasswordError("")
        // }
        //한글을 막으려면 STring()이 아니라 Byte()다.
        //Byte()는 바로 길이를 바로 구할 수 있다. 그럼 <split('').length>을 안 적어도 된다.

    }

    function onTitle(event) {
        setTitle(event.target.value)
        if (event.target.value !== "") {
            setTitleError("")
        }
        if (String(event.target.value).split('').length < 1) {
            setTitleError("필수 정보입니다.")
        }
    }

    function onContents(event) {
        setContents(event.target.value)
        if (event.target.value !== "") {
            setContentsError("")
        }
        if (String(event.target.value).split('').length < 1) {
            setContentsError("필수 정보입니다.")
        }
    }

    //##########################################################
    //  검증하기 / API전송
    //##########################################################

    const onChangeSignup = async () => {

        if (writer === "") {
            setWriterError("필수 정보입니다.")
        }
        if (password === "") {
            setPasswordError("필수 정보입니다.")
        }
        // else if (String(password).split('').length > 8) {
        //     setPasswordError("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        // }
        if (title === "") {
            setTitleError("필수 정보입니다.")
        }
        if (contents === "") {
            setContentsError("필수 정보입니다.")
        }
        if (writer !== "" && password !== "" && title !== "" && contents !== "") {
            alert("게시물 등록이 완료되었습니다.")
            setPasswordError("")

            const result = await updateBoard({
                variables: {
                    number: Number(router.query.number),              ///           password???
                    writer: writer,
                    title: title,
                    contents: contents
                }
            })
            console.log(result)
            router.push(`/Day3/${result.data.updateBoard.number}`)

        }

    }

    //------------------------------------------------------------->HTML :)

    return (
        <Wrapper>
            <Container>
                <HeaderBox>
                    <Title>게시물 수정</Title>
                </HeaderBox>
                <WriterPasswordBox>
                    <Writer>
                        <Label>작성자</Label>
                        <WriterText type="text" onChange={onWriter} placeholder="이름을 작성해주세요." defaultValue={data && data?.fetchBoard?.writer} />
                        {/* <WriterText type="text" onChange={onWriter} placeholder="이름을 작성해주세요.">{data && data?.fetchBoard?.writer}</WriterText> */}
                        {/* <WriterText>{data && data?.fetchBoard?.writer}</WriterText> */}
                        <Error>{writerError}</Error>
                    </Writer>
                    <Password>
                        <Label>비밀번호</Label>
                        {/* <PasswordText type="password" onChange={onPassword} placeholder="비밀번호를 작성해주세요." /> */}
                        <PasswordText type="password" onChange={onPassword} placeholder="비밀번호를 작성해주세요."></PasswordText>
                        <Error>{passwordError}</Error>
                    </Password>
                </WriterPasswordBox>
                <InPutBox>
                    <Label>제목</Label>
                    <TitleText type="text" onChange={onTitle} placeholder="제목을 작성해주세요." defaultValue={data && data?.fetchBoard?.title} />
                    {/* <TitleText type="text" onChange={onTitle} placeholder="제목을 작성해주세요.">{data && data?.fetchBoard?.title}</TitleText> */}
                    {/* <TitleText>{data && data?.fetchBoard?.title}</TitleText> */}
                    <Error>{titleError}</Error>
                </InPutBox>
                <InPutBox>
                    <Label>내용</Label>
                    <ContentsText type="textarea" onChange={onContents} placeholder="내용을 작성해주세요. " defaultValue={data && data?.fetchBoard?.contents} />
                    {/* <ContentsText type="text" onChange={onContents} placeholder="내용을 작성해주세요.">{data && data?.fetchBoard?.contents}</ContentsText> */}
                    {/* <ContentsText>{data && data?.fetchBoard?.contents}</ContentsText> */}
                    <Error>{contentsError}</Error>
                </InPutBox>
                <AddressBox>
                    <Label>주소</Label>
                    <ZipText type="text" placeholder="07250" />
                    <ZipButton>우편변호 검색</ZipButton>
                    <AddressText type="text" placeholder="" />
                    <AddressText type="text" placeholder="" />
                </AddressBox>
                <YoutubeBox>
                    <Label>유튜브</Label>
                    <YoutubeText type="text" placeholder="링크를 복사해주세요." />
                </YoutubeBox>
                <AttachPicturesBox>
                    <Label>사진 첨부</Label>
                    <PicturesOut>
                        <Pictures>+</Pictures>
                        <Pictures>+</Pictures>
                        <Pictures>+</Pictures>
                    </PicturesOut>
                </AttachPicturesBox>
                <MainSettingBox>
                    <Label>메인 설정</Label>
                    <RadioOut>
                        <RadioButton type="radio" name="myaRadio" />
                        <RadioLabel>유튜브</RadioLabel>
                        <RadioButton type="radio" name="myaRadio" />
                        <RadioLabel>사진</RadioLabel>
                    </RadioOut>
                </MainSettingBox>
                <RegistrationBox>
                    <CancelButton>취소하기</CancelButton>
                    <SubmitButton onClick={onChangeSignup}>등록하기</SubmitButton>
                </RegistrationBox>
            </Container>
        </Wrapper>
    );
}




//2023.3.18 16:45 : 음...드디어 데이터를 TEXT박스에 불러오는 것까지는 했다. 그리고 defaultValue를 통해 TEXT박스 안에 들어온 데이터를 수정할 수 있는 것까지는 했다. 이제 수정한
// 값을 게시물창으로 데이터를 전달하는 작업을 하고싶다. 데이터를 수정하려고 하니 number 값을 입력해야 데이터 수정이 가능해졌다. number 값을 어찌 입력해야 하는가?
// 보내는건 기존에 데이터 보내고 받는 형식의 데이터 라우팅과 비슷할 거 같다.
// 방금 알았는데 내용 박스에 입력하다가 엔터로 줄바꿈이 안된다는 사실을 알았다.
// 또 알았는데 제목 CSS부분 넓이 늘려줘야 겠다. 4글자만 넘어가도 글자가 밑으로 밀린다.