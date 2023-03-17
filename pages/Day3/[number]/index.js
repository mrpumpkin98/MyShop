import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { useRouter } from 'next/router'

import {
    Background,
    Wrapper,
    Container,
    ProfileBox,
    HeaderBox,
    AttachPicturesBox,
    ContentsBox,
    YoutubeBox,
    LikeDislikeBox,
    RegistrationBox,
    Footer,
    FooterContainer,
    WriteCommentBox,
    EditCommentBox,
    CommentBox,
    ProfilePicture,
    ProfileNameTie,
    ProfileName,
    PostDate,
    LinkTie,
    Link,
    Map,
    Title,
    YoutubeVideo,
    LikeDislikeTie,
    LikeDislikeIcon,
    LikeDislikeCount,
    ListButton,
    EditButton,
    DeleteButton,
    CommentTitle,
    InPutBox,
    WriterInputPasswordInputTie,
    WriterInput,
    PasswordInput,
    Scope,
    TextTie,
    CommentInput,
    LetterRepair,
    RegistrationButton,
    RetouchButton


} from "../../../styles/Day3";

//##########################################################
//  query문 Day1에서 작성한 자료 Day3에서 받기
//##########################################################

const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number){
        writer
        title
        contents
        createdAt
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


    //##########################################################
    //  받은 시간 데이터 뒤쪽 불필요한 문자 자르기
    //##########################################################

    let At = String(data && data?.fetchBoard?.createdAt)
    let timer = At.substring(0, 10)

    return (
        <Background>
            <Wrapper>
                <Container>
                    <ProfileBox>
                        <ProfilePicture src="/Vector.png"></ProfilePicture>
                        <ProfileNameTie>
                            <ProfileName>{data && data?.fetchBoard?.writer}</ProfileName>
                            <PostDate>Date : {timer}</PostDate>
                        </ProfileNameTie>
                        <LinkTie>
                            <Link src="/1.png"></Link>
                            <Map src="/2.png"></Map>
                        </LinkTie>
                    </ProfileBox>
                    <HeaderBox>
                        <Title>{data && data?.fetchBoard?.title}</Title>
                    </HeaderBox>
                    <AttachPicturesBox src="/image.png"></AttachPicturesBox>
                    <ContentsBox>
                        {data && data?.fetchBoard?.contents}
                    </ContentsBox>
                    <YoutubeBox>
                        <YoutubeVideo src="/video.png"></YoutubeVideo>
                    </YoutubeBox>
                    <LikeDislikeBox>
                        <LikeDislikeTie>
                            <LikeDislikeIcon src="/Vecto.png"></LikeDislikeIcon>
                            <LikeDislikeCount>1920</LikeDislikeCount>
                        </LikeDislikeTie>
                        <LikeDislikeTie>
                            <LikeDislikeIcon src="/Vec.png"></LikeDislikeIcon>
                            <LikeDislikeCount>1920</LikeDislikeCount>
                        </LikeDislikeTie>
                    </LikeDislikeBox>
                </Container>
            </Wrapper>
            <RegistrationBox>
                <ListButton>목록으로</ListButton>
                <EditButton >수정하기</EditButton>
                <DeleteButton>삭제하기</DeleteButton>
            </RegistrationBox>
            <Footer>
                <FooterContainer>
                    <CommentTitle></CommentTitle>
                    <WriteCommentBox>
                        <InPutBox>
                            <WriterInputPasswordInputTie>
                                <WriterInput></WriterInput>
                                <PasswordInput></PasswordInput>
                                <Scope></Scope>
                            </WriterInputPasswordInputTie>
                            <TextTie>
                                <CommentInput></CommentInput>
                                <LetterRepair></LetterRepair>
                                <RegistrationButton></RegistrationButton>
                            </TextTie>
                        </InPutBox>
                    </WriteCommentBox>
                    <EditCommentBox>
                        <WriteCommentBox>
                            <InPutBox>
                                <WriterInputPasswordInputTie>
                                    <WriterInput></WriterInput>
                                    <PasswordInput></PasswordInput>
                                    <Scope></Scope>
                                </WriterInputPasswordInputTie>
                                <TextTie>
                                    <CommentInput></CommentInput>
                                    <LetterRepair></LetterRepair>
                                    <RetouchButton></RetouchButton>
                                </TextTie>
                            </InPutBox>
                        </WriteCommentBox>
                    </EditCommentBox>
                    <CommentBox>
                    </CommentBox>
                </FooterContainer>
            </Footer>
        </Background>
    )

}