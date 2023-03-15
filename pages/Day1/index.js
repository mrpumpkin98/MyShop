import { useState } from "react"

import {
    Wrapper,
    Container,
    //--------------------> Box :)
    InPutBox,
    TwoBox,
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
} from "../../styles/index";

export default function BoardsNewPage() {


    //-------------------------------------------------------> Input에 들어가는 문구 :)
    const [writer, setWriter] = useState("")
    const [password, setPassword] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [zip, setZip] = useState("07250")
    const [youtube, setYoutube] = useState("")

    //---------------------------------------------------------> Input error :(
    const [writerError, setWriterError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [titleError, setTitleError] = useState("")
    const [contentsError, setContentsError] = useState("")
    const [zipError, setZipError] = useState("")

    //----------------------------------------------------------> event.target.value :)

    function onWriter(event) {
        setWriter(event.target.value)
        if (event.target.value !== "") {
            setWriterError("")
        }
    }

    function onPassword(event) {
        setPassword(event.target.value)
        if (event.target.value !== "") {
            setPasswordError("")
        }
    }

    function onTitle(event) {
        setTitle(event.target.value)
        if (event.target.value !== "") {
            setTitleError("")
        }
    }

    function onContents(event) {
        setContents(event.target.value)
        if (event.target.value !== "") {
            setContentsError("")
        }
    }

    //---------------------------------------------------------------> 1. 검증하기

    function onChangeSignup() {

        if (writer === "") {
            setWriterError("작성자를 다시 작성해주세요.")
        }
        if (password === "" && password.length < 3) {
            setPasswordError("비밀번호를 다시 작성해주세요.")
        }
        if (title === "") {
            setTitleError("제목을 다시 작성해주세요.")
        }
        if (contents === "") {
            setContentsError("내용을 다시 작성해주세요.")
        }
        if (writer !== "" && password !== "" && title !== "" && contents !== "") {
            alert("회원가입을 축하합니다!!")
        }

    }

    //------------------------------------------------------------->HTML :)

    return (
        <Wrapper>
            <Container>
                <HeaderBox>
                    <Title>게시물 등록</Title>
                </HeaderBox>
                <TwoBox>
                    <Writer>
                        <Label>작성자</Label>
                        <WriterText type="text" onChange={onWriter} placeholder="이름을 작성해주세요." />
                        <Error>{writerError}</Error>
                    </Writer>
                    <Password>
                        <Label>비밀번호</Label>
                        <PasswordText type="password" onChange={onPassword} placeholder="비밀번호를 작성해주세요." />
                        <Error>{passwordError}</Error>
                    </Password>
                </TwoBox>
                <InPutBox>
                    <Label>제목</Label>
                    <TitleText type="text" onChange={onTitle} placeholder="제목을 작성해주세요." />
                    <Error>{titleError}</Error>
                </InPutBox>
                <InPutBox>
                    <Label>내용</Label>
                    <ContentsText type="text" onChange={onContents} placeholder="내용을 작성해주세요." />
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
                    <SubmitButton onClick={onChangeSignup}>등록하기</SubmitButton>
                </RegistrationBox>
            </Container>
        </Wrapper>
    );
}
