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

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIItemProps
): JSX.Element {
  ///////////////////////////////////////////////////////////////
  // router
  //////////////////////////////////////////////////////////////
  const router = useRouter();

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
    // console.log(data.fetchUseditemQuestions);
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
        <S.Wrapper>
          <S.ItemWrapper key={props.el._id}>
            <S.FlexWrapper>
              <Space>
                <Avatar
                  size={30}
                  style={{
                    cursor: "pointer",
                    margin: "0px 0px 30px 0px",
                  }}
                  icon={<UserOutlined />}
                  src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                />
              </Space>
              <S.MainWrapper>
                <S.WriterWrapper>
                  <S.Writer>{props?.el?.user?.name}</S.Writer>
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
                  <Space>
                    <Avatar
                      size={30}
                      style={{
                        cursor: "pointer",
                      }}
                      icon={<UserOutlined />}
                      src={`https://storage.googleapis.com/${i.user?.picture}`}
                    />
                  </Space>
                  <S.MainWrapper>
                    <S.WriterWrapper>
                      <S.Writer>{i.user.name}</S.Writer>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                  <S.OptionWrapper>
                    {/* <S.FormOut /> */}
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
              <Space>
                <Avatar
                  size={30}
                  style={{
                    cursor: "pointer",
                  }}
                  icon={<UserOutlined />}
                  src={`https://storage.googleapis.com/${props.el?.user?.picture}`}
                />
              </Space>
              <S.MainWrapper>
                <S.WriterWrapper>
                  <S.Writer>{props.el?.user?.name}</S.Writer>
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
                  <Space>
                    <Avatar
                      size={30}
                      style={{
                        cursor: "pointer",
                      }}
                      icon={<UserOutlined />}
                      src={`https://storage.googleapis.com/${i.user?.picture}`}
                    />
                  </Space>
                  <S.MainWrapper>
                    <S.WriterWrapper>
                      <S.Writer>{i.user.name}</S.Writer>
                    </S.WriterWrapper>
                    <S.Contents>{i.contents}</S.Contents>
                  </S.MainWrapper>
                  <S.OptionWrapper>
                    {/* <S.FormOut /> */}
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
