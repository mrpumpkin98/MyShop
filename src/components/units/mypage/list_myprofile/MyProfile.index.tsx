import Uploads01 from "../../../../commons/uploads/02/Uploads01.container";
import { v4 as uuidv4 } from "uuid";
import * as B from "./MyProfile.styles";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { UPDATE_USER } from "../../../../commons/hooks/mutations/UseMutationUpdateUser";

export default function MyPage() {
  const [fileUrls, setFileUrls] = useState([""]);
  const { data, refetch } = useQuery(FETCH_USER_LOGGED_IN);
  const [NameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);

  ///////////////////////////////////////////////////////////////
  //  onChange
  //////////////////////////////////////////////////////////////

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  ///////////////////////////////////////////////////////////////
  //  이미지 등록
  //////////////////////////////////////////////////////////////

  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  useEffect(() => {
    const images = String(data?.fetchUserLoggedIn.picture);
    if (images !== undefined && images !== null) setFileUrls([images]);
  }, [data]);

  ///////////////////////////////////////////////////////////////
  //  등록하기
  //////////////////////////////////////////////////////////////
  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(data?.fetchUserLoggedIn.picture);
    const isChangedFiles = currentFiles !== defaultFiles;
    if (!name) {
      setNameError("작성자를 입력해주세요.");
    }

    const updateUserInput: any = {};
    if (name !== "") updateUserInput.name = name;
    if (isChangedFiles) updateUserInput.picture = String([fileUrls]);
    try {
      const result = await updateUser({
        variables: {
          updateUserInput,
          // : {
          //   name,
          //   picture: String([fileUrls]),
          // },
        },
      });
      alert("회원정보수정이 완료되었습니다!");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div>
      <B.Wrapper>
        <B.Title>회원정보수정</B.Title>
        <B.InputWrapper>
          <B.Label>이메일</B.Label>
          <B.Subject
            type="text"
            readOnly={data?.fetchUserLoggedIn.email}
            value={data?.fetchUserLoggedIn.email}
          />
        </B.InputWrapper>
        <B.Line></B.Line>
        <B.InputWrapper>
          <B.Label>닉네임</B.Label>
          <B.Subject
            type="text"
            placeholder="새 닉네임을 입력해 주세요."
            onChange={onChangeName}
            defaultValue={data?.fetchUserLoggedIn.name}
          />
        </B.InputWrapper>
        <B.Line></B.Line>
        <B.InputWrapper>
          <B.Label>프로필 이미지</B.Label>
          <B.UploadButton>
            {fileUrls.map((el, index) => (
              <Uploads01
                key={uuidv4()}
                index={index}
                fileUrl={el}
                onChangeFileUrls={onChangeFileUrls}
              />
            ))}
          </B.UploadButton>
        </B.InputWrapper>
        <B.Line></B.Line>
        <B.Button onClick={onClickUpdate}>회원 정보 수정</B.Button>
      </B.Wrapper>
    </div>
  );
}
