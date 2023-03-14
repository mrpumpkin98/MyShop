
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
    //--------------------> 기타 등등 :)
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
    return (
        <Wrapper>
            <Container>
                <HeaderBox>
                    <Title>게시물 등록</Title>
                </HeaderBox>
                <TwoBox>
                    <Writer>
                        <Label>작성자</Label>
                        <WriterText type="text" placeholder="이름을 작성해주세요." />
                    </Writer>
                    <Password>
                        <Label>비밀번호</Label>
                        <PasswordText type="password" placeholder="비밀번호를 작성해주세요." />
                    </Password>
                </TwoBox>
                <InPutBox>
                    <Label>제목</Label>
                    <TitleText type="text" placeholder="제목을 작성해주세요." />
                </InPutBox>
                <InPutBox>
                    <Label>내용</Label>
                    <ContentsText type="text" placeholder="내용을 작성해주세요." />
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
                        <RadioButton type="radio" />
                        <RadioLabel>유튜브</RadioLabel>
                        <RadioButton type="radio" />
                        <RadioLabel>사진</RadioLabel>
                    </RadioOut>
                </MainSettingBox>
                <RegistrationBox>
                    <SubmitButton>등록하기</SubmitButton>
                </RegistrationBox>
            </Container>
        </Wrapper>
    );
}
