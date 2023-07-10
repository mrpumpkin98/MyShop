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
  DELETE_USED_ITEM_QUESTION_ANSWER,
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

export default function BoardCommentListUIItem(props: any): JSX.Element {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////
  const router = useRouter();
  ///////////////////////////////////////////////////////////////
  // useState
  //////////////////////////////////////////////////////////////
  const [isReply, setIsisReply] = useState("대댓글OFF");
  const [isEditComment, setIsEditComment] = useState("댓글수정OFF");
  const [isEditReply, setIsEditReply] = useState("대댓글수정OFF");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  ///////////////////////////////////////////////////////////////
  // queries
  //////////////////////////////////////////////////////////////
  const [deleteUseditemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION);
  const [deleteUseditemQuestionAnswer] = useMutation(
    DELETE_USED_ITEM_QUESTION_ANSWER
  );

  ////////////////////////////////////////
  // 댓글 삭제 (댓글)
  ////////////////////////////////////////

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

  ////////////////////////////////////////
  // 댓글 삭제 (대댓글)
  ////////////////////////////////////////

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

  const onClickAnswer1 = (i: any): void => {
    console.log(data.fetchUseditemQuestionAnswers);
    console.log(String(i.currentTarget._id));
  };

  ////////////////////////////////////////
  // 대댓글 클릭 이벤트
  ////////////////////////////////////////

  const onClickAnswer = (): void => {
    setIsisReply("대댓글ON");
  };

  ////////////////////////////////////////
  // 댓글 수정 이벤트
  ////////////////////////////////////////

  const onClickEditComment = (): void => {
    setIsEditComment("댓글수정ON");
    console.log(props.el);
  };

  /////////////////////////////return/////////////////////////////////

  return (
    <>
      {isOpenDeleteModal && (
        <S.PasswordModal
          visible={true}
          onOk={onClickDeleteComment}
          onCancel={handleCancel}
        >
          <div>작성한 댓글을 삭제하시겠습니까?</div>
        </S.PasswordModal>
      )}
      {isReply === "대댓글OFF" ? (
        <>
          <S.Wrapper>
            <S.ItemWrapper key={props.el._id}>
              {isEditComment === "댓글수정OFF" ? (
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
                          id={props.el._id}
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
                <>
                  <BoardCommentWrite
                    isEditComment={"댓글수정ON"}
                    setIsEditComment={setIsEditComment}
                    el={props.el}
                  />
                </>
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
                            onClick={onClickDeleteReply}
                            id={i._id}
                          >
                            삭제
                          </S.AnswerButton>
                        </S.OptionWrapper>
                      </S.WriterWrapper>
                      <S.Contents>{i.contents}</S.Contents>
                    </S.MainWrapper>
                  </S.FlexWrapper>
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
              isReply={"대댓글ON"}
              setIsisReply={setIsisReply}
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
                        <S.AnswerButton onClick={onClickDeleteReply} id={i._id}>
                          삭제
                        </S.AnswerButton>
                      </S.OptionWrapper>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                </S.FlexWrapper>
              </S.AnswerItemWrapper>
            ))}
          </div>
        </S.Wrapper>
      )}
    </>
  );
}
