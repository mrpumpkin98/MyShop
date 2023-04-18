import * as B from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./Boardwrite.types";
import Uploads01 from "../../../../commons/uploads/01/Uploads01.container";
import { v4 as uuidv4 } from "uuid";

export default function BoardWriteUI(props: IBoardWriteUIProps) {
  return (
    <div>
      {props.isOpen && (
        <B.AddressModal visible={true} onOk={props.Ok} onCancel={props.Cancel}>
          <B.AddressSearchInput onComplete={props.onCompleteAddressSearch} />
        </B.AddressModal>
      )}
      <B.Wrapper>
        <B.Title>{props.isEdit ? "수정글" : "게시글"} 등록</B.Title>
        <B.WriterWrapper>
          <B.InputWrapper>
            <B.Label>작성자</B.Label>
            <B.Writer
              type="text"
              placeholder="이름을 적어주세요."
              onChange={props.onChangeWriter}
              value={props.data?.fetchBoard.writer}
              readOnly={props.data?.fetchBoard.writer}
              ref={props.inputRef}
            />
            <B.Error>{props.writerError}</B.Error>
          </B.InputWrapper>
          <B.InputWrapper>
            <B.Label>비밀번호</B.Label>
            <B.Password
              type="password"
              placeholder="비밀번호를 작성해주세요."
              onChange={props.onChangePassword}
            />
            <B.Error>{props.passwordError}</B.Error>
          </B.InputWrapper>
        </B.WriterWrapper>
        <B.InputWrapper>
          <B.Label>제목</B.Label>
          <B.Subject
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={props.onChangeTitle}
            defaultValue={props.data?.fetchBoard.title}
          />
          <B.Error>{props.titleError}</B.Error>
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>내용</B.Label>
          <B.Contents
            placeholder="내용을 작성해주세요."
            onChange={props.onChangeContents}
            defaultValue={props.data?.fetchBoard.contents}
          ></B.Contents>
          <B.Error>{props.contentsError}</B.Error>
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>주소</B.Label>
          <B.ZipcodeWrapper>
            <B.Zipcode
              placeholder="07250"
              readOnly
              value={
                props.zipcode !== ""
                  ? props.zipcode
                  : props.data?.fetchBoard.boardAddress?.zipcode ?? ""
              }
            />
            <B.SearchButton onClick={props.onClickAddressSearch}>
              우편번호 검색
            </B.SearchButton>
          </B.ZipcodeWrapper>
          <B.Address
            readOnly
            value={
              props.address !== ""
                ? props.address
                : props.data?.fetchBoard.boardAddress?.address ?? ""
            }
          />
          <B.Address
            onChange={props.onChangeAddressDetail}
            defaultValue={
              props.data?.fetchBoard.boardAddress?.addressDetail ?? ""
            }
          />
        </B.InputWrapper>
        <B.InputWrapper>
          <B.Label>유튜브</B.Label>
          <B.Youtube
            placeholder="링크를 복사해주세요."
            onChange={props.onChangeYoutubeUrl}
            defaultValue={props.data?.fetchBoard.youtubeUrl ?? ""}
          />
        </B.InputWrapper>
        <B.ImageWrapper>
          <B.Label>사진첨부</B.Label>
          <B.UploadButton>
            {props.fileUrls.map((el, index) => (
              <Uploads01
                key={uuidv4()}
                index={index}
                fileUrl={el}
                onChangeFileUrls={props.onChangeFileUrls}
              />
            ))}
          </B.UploadButton>
        </B.ImageWrapper>
        <B.OptionWrapper>
          <B.Label>메인설정</B.Label>
          <B.RadioButton type="radio" id="youtube" name="radio-button" />
          <B.RadioLabel htmlFor="youtube">유튜브</B.RadioLabel>
          <B.RadioButton type="radio" id="image" name="radio-button" />
          <B.RadioLabel htmlFor="image">사진</B.RadioLabel>
        </B.OptionWrapper>
        <B.ButtonWrapper>
          <B.SubmitButton
            onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
            Active={props.isEdit ? true : props.Active}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </B.SubmitButton>
          <B.CancelButton onClick={props.onClickCancel}>
            취소하기
          </B.CancelButton>
        </B.ButtonWrapper>
      </B.Wrapper>
    </div>
  );
}
