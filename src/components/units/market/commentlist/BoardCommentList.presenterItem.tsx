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
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editComment } from "../../../../commons/stores";

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIItemProps
): JSX.Element {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////
  const router = useRouter();
  const setCommentEdit = useSetRecoilState(editComment);
  const editCommentValue = useRecoilValue(editComment);
  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////
  const [deleteUseditemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION);

  ////////////////////////////////////////
  // 댓글 삭제
  ////////////////////////////////////////

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
    event: MouseEvent<HTMLButtonElement>
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
  // 대댓글
  ////////////////////////////////////////

  if (typeof router.query.useditemId !== "string") return <></>;

  const { data } = useQuery(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: props.el._id },
  });

  const onClickAnswer1 = (): void => {
    console.log(data.fetchUseditemQuestionAnswers);
  };

  ////////////////////////////////////////
  // 대댓글 클릭 이벤트
  ////////////////////////////////////////

  const onClickAnswer = (): void => {
    setIsEdit(true);
  };

  ////////////////////////////////////////
  // 댓글 수정 이벤트
  ////////////////////////////////////////

  const onClickEditComment = (): void => {
    setCommentEdit(true);
  };

  /////////////////////////////return/////////////////////////////////

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
        <>
          <S.Wrapper>
            <S.ItemWrapper key={props.el._id}>
              {editCommentValue === false ? (
                <S.FlexWrapper>
                  <S.MainWrapper>
                    <S.WriterWrapper className="Blue">
                      <Space>
                        <Avatar
                          size={26}
                          icon={<UserOutlined />}
                          src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                        />
                      </Space>
                      <S.Writer>{props?.el?.user?.name}</S.Writer>
                      <S.OptionWrapper>
                        <S.AnswerButton onClick={onClickAnswer} className="Go">
                          답글
                        </S.AnswerButton>
                        <S.AnswerButton
                          onClick={onClickEditComment}
                          className="Edit"
                        >
                          수정
                        </S.AnswerButton>
                        <S.AnswerButton onClick={onClickOpenDeleteModal}>
                          삭제
                        </S.AnswerButton>
                      </S.OptionWrapper>
                    </S.WriterWrapper>
                    <S.Contents>{props.el.contents}</S.Contents>
                  </S.MainWrapper>
                </S.FlexWrapper>
              ) : (
                <BoardCommentWrite
                  isEdit={true}
                  // setIsEdit={setIsEdit}
                  el={props.el}
                />
              )}
            </S.ItemWrapper>
            <div>
              {data?.fetchUseditemQuestionAnswers?.map((i: any) => (
                <S.AnswerItemWrapper key={i._id}>
                  <S.Arrow src="/images/icons/arrow-829.png" />
                  <S.FlexWrapper>
                    <S.MainWrapper>
                      <S.WriterWrapper>
                        <Space>
                          <Avatar
                            size={26}
                            icon={<UserOutlined />}
                            src={`https://storage.googleapis.com/${i?.user?.picture}`}
                          />
                        </Space>
                        <S.Writer>{i?.user?.name}</S.Writer>
                        <S.OptionWrapper>
                          <S.AnswerButton
                            onClick={onClickAnswer}
                            className="Go"
                          >
                            답글
                          </S.AnswerButton>
                          <S.AnswerButton
                            onClick={onClickOpenDeleteModal}
                            className="Edit"
                          >
                            수정
                          </S.AnswerButton>
                          <S.AnswerButton onClick={onClickOpenDeleteModal}>
                            삭제
                          </S.AnswerButton>
                        </S.OptionWrapper>
                      </S.WriterWrapper>
                      <S.Contents>{i.contents}</S.Contents>
                    </S.MainWrapper>
                  </S.FlexWrapper>
                  <S.DateString></S.DateString>
                </S.AnswerItemWrapper>
              ))}
            </div>
          </S.Wrapper>
        </>
      ) : (
        <S.Wrapper>
          <S.ItemWrapper key={props.el._id}>
            <S.FlexWrapper>
              <S.MainWrapper>
                <S.WriterWrapper className="Blue">
                  <Space>
                    <Avatar
                      size={26}
                      icon={<UserOutlined />}
                      src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                    />
                  </Space>
                  <S.Writer>{props?.el?.user?.name}</S.Writer>
                  <S.OptionWrapper>
                    <S.AnswerButton onClick={onClickAnswer} className="Go">
                      답글
                    </S.AnswerButton>
                    <S.AnswerButton
                      onClick={onClickOpenDeleteModal}
                      className="Edit"
                    >
                      수정
                    </S.AnswerButton>
                    <S.AnswerButton onClick={onClickOpenDeleteModal}>
                      삭제
                    </S.AnswerButton>
                  </S.OptionWrapper>
                </S.WriterWrapper>
                <S.Contents>{props.el.contents}</S.Contents>
              </S.MainWrapper>
            </S.FlexWrapper>
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
                <S.Arrow src="/images/icons/arrow-829.png" />
                <S.FlexWrapper>
                  <S.MainWrapper>
                    <S.WriterWrapper>
                      <Space>
                        <Avatar
                          size={26}
                          icon={<UserOutlined />}
                          src={`https://storage.googleapis.com/${i?.user?.picture}`}
                        />
                      </Space>
                      <S.Writer>{i?.user?.name}</S.Writer>
                      <S.OptionWrapper>
                        <S.AnswerButton onClick={onClickAnswer} className="Go">
                          답글
                        </S.AnswerButton>
                        <S.AnswerButton
                          onClick={onClickOpenDeleteModal}
                          className="Edit"
                        >
                          수정
                        </S.AnswerButton>
                        <S.AnswerButton onClick={onClickOpenDeleteModal}>
                          삭제
                        </S.AnswerButton>
                      </S.OptionWrapper>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                </S.FlexWrapper>
                <S.DateString></S.DateString>
              </S.AnswerItemWrapper>
            ))}
          </div>
        </S.Wrapper>
      )}
    </>
  );
}
