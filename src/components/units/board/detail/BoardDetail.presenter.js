import { Avatar, AvatarWrapper, Body, BottomWrapper, Button, CardWrapper, Contents, CreatedAt, Header, Info, Title, Wrapper, Writer } from "./BoardDetail.styles";


export default function BoardDetailUI(props) {
    return (
        <div>
            <Wrapper>
                <CardWrapper>
                    <Header>
                        <AvatarWrapper>
                            <Avatar src="/images/avatar.png" />
                            <Info>
                                <Writer>{props.aaa?.fetchBoard?.writer}</Writer>
                                <CreatedAt>
                                    {props.aaa?.fetchBoard?.createdAt}
                                </CreatedAt>
                            </Info>
                        </AvatarWrapper>
                    </Header>
                    <Body>
                        <Title>{props.aaa?.fetchBoard?.title}</Title>
                        <Contents>{props.aaa?.fetchBoard?.contents}</Contents>
                    </Body>
                </CardWrapper>
                <BottomWrapper>
                    <Button>목록으로</Button>
                    <Button>수정하기</Button>
                    <Button>삭제하기</Button>
                </BottomWrapper>
            </Wrapper>
        </div>
    );
}