import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import type {
  IMutation,
  IMutationDeleteBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import {
  DELETE_BOARD_COMMENT,
  DELETE_USED_ITEM_QUESTION,
  FETCH_BOARD_COMMENTS,
  FETCH_USED_ITEM_QUESTIONS,
} from "./BoardCommentList.queries";
import * as S from "./BoardCommentList.styles";
import type { IBoardCommentListUIItemProps } from "./BoardCommentList.types";
import { useRouter } from "next/router";
import { getDate } from "../../../../commons/libraries/utils";
import BoardCommentWrite from "../comment/BoardComment.container";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "./BoardCommentList.queries";

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIItemProps
): JSX.Element {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  const [deleteUseditemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION);

  const onClickAnswer = (): void => {
    setIsEdit(true);
    // console.log(data.fetchUseditemQuestions);
  };

  const onClickDelete = async (
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

  const onClickOpenDeleteModal = (
    event: MouseEvent<HTMLImageElement>
  ): void => {
    setIsOpenDeleteModal(true);
  };

  const handleCancel = () => {
    setIsOpenDeleteModal(false);
  };

  const onChangeDeletePassword = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  ////////////////////////////////////////
  // 댓글 답글
  ////////////////////////////////////////

  if (typeof router.query.useditemId !== "string") return <></>;

  const { data } = useQuery(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: props.el._id },
  });

  const onClickAnswer1 = (): void => {
    console.log(data.fetchUseditemQuestionAnswers);
  };

  return (
    <>
      {isOpenDeleteModal && (
        <S.PasswordModal
          visible={true}
          onOk={onClickDelete}
          onCancel={handleCancel}
        >
          <div>작성한 댓글을 삭제하시겠습니까?</div>
        </S.PasswordModal>
      )}
      {!isEdit ? (
        <S.Wrapper>
          <S.ItemWrapper key={props.el._id}>
            <S.FlexWrapper>
              <S.Avatar src="/images/avatar.png" />
              <S.MainWrapper>
                <S.WriterWrapper>
                  <S.Writer>임시 작성자</S.Writer>
                </S.WriterWrapper>
                <S.Contents>{props.el.contents}</S.Contents>
              </S.MainWrapper>
              <S.OptionWrapper>
                <S.Edit onClick={onClickAnswer} />
                <S.Delete onClick={onClickOpenDeleteModal} />
              </S.OptionWrapper>
            </S.FlexWrapper>
            <S.DateString>{getDate(props.el.createdAt)}</S.DateString>
          </S.ItemWrapper>
          <div>
            {data?.fetchUseditemQuestionAnswers?.map((i: any) => (
              <S.AnswerItemWrapper key={i._id}>
                <S.RightSquare />
                <S.FlexWrapper>
                  <S.Avatar src="/images/avatar.png" />
                  <S.MainWrapper>
                    <S.WriterWrapper>
                      <S.Writer>임시 작성자</S.Writer>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                  <S.OptionWrapper>
                    <S.FormOut />
                    {/* <S.Edit onClick={onClickAnswer} /> */}
                    {/* <S.Delete onClick={onClickOpenDeleteModal} /> */}
                  </S.OptionWrapper>
                </S.FlexWrapper>
                <S.DateString></S.DateString>
              </S.AnswerItemWrapper>
            ))}
          </div>
        </S.Wrapper>
      ) : (
        <S.Wrapper>
          <S.ItemWrapper key={props.el._id}>
            <S.FlexWrapper>
              <S.Avatar src="/images/avatar.png" />
              <S.MainWrapper>
                <S.WriterWrapper>
                  <S.Writer>임시 작성자</S.Writer>
                </S.WriterWrapper>
                <S.Contents>{props.el.contents}</S.Contents>
              </S.MainWrapper>
              <S.OptionWrapper>
                {/* <S.FormOut /> */}
                <S.Edit onClick={onClickAnswer} />
                <S.Delete onClick={onClickOpenDeleteModal} />
              </S.OptionWrapper>
            </S.FlexWrapper>
            <S.DateString>{getDate(props.el.createdAt)}</S.DateString>
          </S.ItemWrapper>
          <S.WapperBoardCommentWrite>
            <BoardCommentWrite
              isEdit={true}
              setIsEdit={setIsEdit}
              el={props.el}
            />
          </S.WapperBoardCommentWrite>
          <div>
            {data?.fetchUseditemQuestionAnswers?.map((i: any) => (
              <S.AnswerItemWrapper key={i._id}>
                <S.FlexWrapper>
                  <S.Avatar src="/images/avatar.png" />
                  <S.MainWrapper>
                    <S.WriterWrapper>
                      <S.Writer>임시 작성자</S.Writer>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                  <S.OptionWrapper>
                    <S.FormOut />
                    {/* <S.Edit onClick={onClickAnswer} />
                    <S.Delete onClick={onClickOpenDeleteModal} /> */}
                  </S.OptionWrapper>
                </S.FlexWrapper>
                <S.DateString></S.DateString>
              </S.AnswerItemWrapper>
            ))}
          </div>
          {/* <S.BoardCommentCancel>수정 취소</S.BoardCommentCancel> */}
        </S.Wrapper>
      )}
    </>
  );
}
