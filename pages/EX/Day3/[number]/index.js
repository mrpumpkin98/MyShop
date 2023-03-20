import { useState } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
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
    RetouchButton,
    Comment,
    CommentProfilePicture,
    CommentTie,
    CommentProfile,
    CommentName,
    CommentIconTie,
    CommentEdit,
    CommentDelete,
    CommentDetail,
    CommentDate,
    Star








} from "../../../styles/Day3";

//##########################################################
//  query문 Day1에서 작성한 자료 Day3에서 받기
//##########################################################

const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number){
        number
        writer
        title
        contents
        createdAt
        }
    }
`

// const 나의그래프큐엘셋팅 = gql`
//         mutation{
//         createBoard(writer: "저는", title: "신재욱", contents: "입니다."){
//             _id
//             number
//             message
//         }
//     }
// `

// const 나의그래프큐엘셋팅 = gql`
//         mutation createBoard($writer: String, $title: String, $contents: String){
//         createBoard(writer: data.fetchBoard.writer, title: data.fetchBoard.title, contents: data.fetchBoard.contents){
//             _id
//             number
//             message
//         }
//     }
// `


export default function BoardsNewPage() {
    // const [나의함수] = useMutation(나의그래프큐엘셋팅)

    const router = useRouter()
    console.log(router)

    const { data } = useQuery(FETCH_BOARD, {
        variables: { number: Number(router.query.number) }
    })

    // console.log(data)
    // console.log(data)


    //##########################################################
    //  받은 시간 데이터 뒤쪽 불필요한 문자 자르기
    //##########################################################

    let At = String(data && data?.fetchBoard?.createdAt)
    let timer = At.substring(0, 10) //포멧으로 하면 됨

    //##########################################################
    //  수정버튼
    //##########################################################
    const PressEditButton = async () => {
        console.log(data)
        router.push(`/Day2/${data.fetchBoard.number}`)
    }


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
                        <YoutubeVideo src="/dio.png"></YoutubeVideo>
                    </YoutubeBox>
                    <LikeDislikeBox>
                        <LikeDislikeTie>
                            <LikeDislikeIcon src="/Vecto.png"></LikeDislikeIcon>
                            <LikeDislikeCount>0</LikeDislikeCount>
                        </LikeDislikeTie>
                        <LikeDislikeTie>
                            <LikeDislikeIcon src="/Vec.png"></LikeDislikeIcon>
                            <LikeDislikeCount>0</LikeDislikeCount>
                        </LikeDislikeTie>
                    </LikeDislikeBox>
                </Container>
            </Wrapper>
            <RegistrationBox>
                <ListButton>목록으로</ListButton>
                <EditButton onClick={PressEditButton} >수정하기</EditButton>
                <DeleteButton>삭제하기</DeleteButton>
            </RegistrationBox>
            <Footer>
                <FooterContainer>
                    <CommentTitleTie>
                        <CommentTitleIcon src="/CommentTitleIcon.png"></CommentTitleIcon>
                        <CommentTitle>댓글</CommentTitle>
                    </CommentTitleTie>
                    <WriteCommentBox>
                        <InPutBox>
                            <WriterInputPasswordInputTie>
                                <WriterInput type="input" placeholder="작성자"></WriterInput>
                                <PasswordInput type="input" placeholder="비밀번호"></PasswordInput>
                                <Scope>
                                    <Star></Star>
                                    <Star></Star>
                                    <Star></Star>
                                    <Star></Star>
                                    <Star></Star>
                                </Scope>
                            </WriterInputPasswordInputTie>
                            <TextTie>
                                <CommentInput type="input" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></CommentInput>
                                <LetterRepair></LetterRepair>
                                <RegistrationButton></RegistrationButton>
                            </TextTie>
                        </InPutBox>
                    </WriteCommentBox>
                    <EditCommentBox>
                        <WriteCommentBox>
                            <InPutBox>
                                <WriterInputPasswordInputTie>
                                    <WriterInput type="input" placeholder="작성자"></WriterInput>
                                    <PasswordInput type="input" placeholder="비밀번호"></PasswordInput>
                                    <Scope></Scope>
                                </WriterInputPasswordInputTie>
                                <TextTie>
                                    <CommentInput type="input" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></CommentInput>
                                    <LetterRepair></LetterRepair>
                                    <RetouchButton></RetouchButton>
                                </TextTie>
                            </InPutBox>
                        </WriteCommentBox>
                    </EditCommentBox>
                    <CommentBox>
                        <Comment>
                            <CommentProfilePicture src="/CommentProfilePicture.png"></CommentProfilePicture>
                            <CommentTie>
                                <CommentProfile>
                                    <CommentName>신재욱</CommentName>
                                    <Scope></Scope>
                                    <CommentIconTie>
                                        <CommentEdit></CommentEdit>
                                        <CommentDelete></CommentDelete>
                                    </CommentIconTie>
                                </CommentProfile>
                                <CommentDetail></CommentDetail>
                            </CommentTie>
                        </Comment>
                        <CommentDate></CommentDate>
                    </CommentBox>
                </FooterContainer>
            </Footer>
        </Background>
    )

}

//3월19일 : scop 별 이미지 넣기부터 시작하면됨