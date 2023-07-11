import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import * as S from "./CommentList.styles";
import { useRouter } from "next/router";
import CommentWrite from "../comment/Comment.container";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { DELETE_USED_ITEM_QUESTION_ANSWER } from "../../../../commons/hooks/mutations/UseMutationDeleteUsedItemQuestionAnswer";
import { DELETE_USED_ITEM_QUESTION } from "../../../../commons/hooks/mutations/UseMutationDeleteUsedItemQuestion";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestionsAnswers";
import { FETCH_USED_ITEM_QUESTIONS } from "../../../../commons/hooks/queries/UseQueryFetchUsedItemQuestions";

export default function CommentListUIItem(props: any): JSX.Element {
  const router = useRouter();
  const [isReply, setIsisReply] = useState("대댓글OFF");
  const [isEditComment, setIsEditComment] = useState("댓글수정OFF");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteUseditemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION);
  const [deleteUseditemQuestionAnswer] = useMutation(
    DELETE_USED_ITEM_QUESTION_ANSWER
  );
  const { data } = useQuery(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: props.el._id },
  });

  // < 댓글 삭제 (댓글) >

  const onClickDeleteComment = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    // const password = prompt("비밀번호를 입력하세요.");
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: props.el._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // < 댓글 삭제 (대댓글) >

  const onClickDeleteReply = async (
    i: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    // const password = prompt("비밀번호를 입력하세요.");
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: String(i.currentTarget.id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: props.el._id },
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickOpenDeleteModal = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    setIsOpenDeleteModal(true);
  };

  const handleCancel = () => {
    setIsOpenDeleteModal(false);
  };

  // < 대댓글 클릭 이벤트 >

  const onClickAnswer = (): void => {
    setIsisReply("대댓글ON");
  };

  // < 댓글 수정 이벤트 >

  const onClickEditComment = (): void => {
    setIsEditComment("댓글수정ON");
  };

  return (
    <>
      {isOpenDeleteModal && (
        <S.Modals
          visible={true}
          onOk={onClickDeleteComment}
          onCancel={handleCancel}
        >
          <div>작성한 댓글을 삭제하시겠습니까?</div>
        </S.Modals>
      )}
      {isReply === "대댓글OFF" ? (
        <>
          <S.Wrapper>
            <S.CommentArticle key={props.el._id}>
              {isEditComment === "댓글수정OFF" ? (
                <S.FlexWrapper>
                  <S.CommentWrapper>
                    <S.CommentBox className="Blue">
                      <Space>
                        <Avatar
                          size={26}
                          icon={<UserOutlined />}
                          src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                        />
                      </Space>
                      <S.CommentName>{props?.el?.user?.name}</S.CommentName>
                      <S.Nav>
                        <S.CommentButton onClick={onClickAnswer} className="Go">
                          답글
                        </S.CommentButton>
                        <S.CommentButton
                          onClick={onClickEditComment}
                          className="Edit"
                          id={props.el._id}
                        >
                          수정
                        </S.CommentButton>
                        <S.CommentButton onClick={onClickOpenDeleteModal}>
                          삭제
                        </S.CommentButton>
                      </S.Nav>
                    </S.CommentBox>
                    <S.CommentContents>{props.el.contents}</S.CommentContents>
                  </S.CommentWrapper>
                </S.FlexWrapper>
              ) : (
                <>
                  <CommentWrite
                    isEditComment={"댓글수정ON"}
                    setIsEditComment={setIsEditComment}
                    el={props.el}
                  />
                </>
              )}
            </S.CommentArticle>
            <>
              {data?.fetchUseditemQuestionAnswers?.map((i: any) => (
                <S.AnswerItemWrapper key={i._id}>
                  <S.Arrow src="/images/icons/arrow-829.png" />
                  <S.FlexWrapper>
                    <S.InCommentsWrapper>
                      <S.InCommentBox>
                        <Space>
                          <Avatar
                            size={26}
                            icon={<UserOutlined />}
                            src={`https://storage.googleapis.com/${i?.user?.picture}`}
                          />
                        </Space>
                        <S.InCommentName>{i?.user?.name}</S.InCommentName>
                        <S.Nav>
                          <S.InCommentButton
                            onClick={onClickDeleteReply}
                            id={i._id}
                          >
                            삭제
                          </S.InCommentButton>
                        </S.Nav>
                      </S.InCommentBox>
                      <S.InCommentContents>{i.contents}</S.InCommentContents>
                    </S.InCommentsWrapper>
                  </S.FlexWrapper>
                </S.AnswerItemWrapper>
              ))}
            </>
          </S.Wrapper>
        </>
      ) : (
        <S.Wrapper>
          <S.CommentArticle key={props.el._id}>
            <S.FlexWrapper>
              <S.CommentWrapper>
                <S.CommentBox className="Blue">
                  <Space>
                    <Avatar
                      size={26}
                      icon={<UserOutlined />}
                      src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                    />
                  </Space>
                  <S.CommentName>{props?.el?.user?.name}</S.CommentName>
                  <S.Nav>
                    <S.CommentButton onClick={onClickAnswer} className="Go">
                      답글
                    </S.CommentButton>
                    <S.CommentButton
                      onClick={onClickOpenDeleteModal}
                      className="Edit"
                    >
                      수정
                    </S.CommentButton>
                    <S.CommentButton onClick={onClickOpenDeleteModal}>
                      삭제
                    </S.CommentButton>
                  </S.Nav>
                </S.CommentBox>
                <S.CommentContents>{props.el.contents}</S.CommentContents>
              </S.CommentWrapper>
            </S.FlexWrapper>
          </S.CommentArticle>
          <S.CommentWriteBox>
            <CommentWrite
              isReply={"대댓글ON"}
              setIsisReply={setIsisReply}
              el={props.el}
            />
          </S.CommentWriteBox>
          <>
            {data?.fetchUseditemQuestionAnswers?.map((i: any) => (
              <S.AnswerItemWrapper key={i._id}>
                <S.Arrow src="/images/icons/arrow-829.png" />
                <S.FlexWrapper>
                  <S.InCommentsWrapper>
                    <S.InCommentBox>
                      <Space>
                        <Avatar
                          size={26}
                          icon={<UserOutlined />}
                          src={`https://storage.googleapis.com/${i?.user?.picture}`}
                        />
                      </Space>
                      <S.InCommentName>{i?.user?.name}</S.InCommentName>
                      <S.Nav>
                        <S.InCommentButton
                          onClick={onClickDeleteReply}
                          id={i._id}
                        >
                          삭제
                        </S.InCommentButton>
                      </S.Nav>
                    </S.InCommentBox>
                    <S.InCommentContents>{i.contents}</S.InCommentContents>
                  </S.InCommentsWrapper>
                </S.FlexWrapper>
              </S.AnswerItemWrapper>
            ))}
          </>
        </S.Wrapper>
      )}
    </>
  );
}
