import { v4 as uuidv4 } from "uuid";
import * as B from "./MyProfile.styles";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Uploads01 from "../../../commons/uploads/02/Uploads01.container";
import { UPDATE_USER } from "../../../commons/hooks/mutations/UseMutationUpdateUser";
import { FETCH_USER_LOGGED_IN } from "../../../commons/hooks/queries/UseQueryFetchUserLogedIn";
import { useOnClickMyPage } from "../../../commons/hooks/event/useOnClickMyPage";

export default function MyPage() {
  const [fileUrls, setFileUrls] = useState([""]);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const [NameError, setNameError] = useState("");
  const [name, setName] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // < 이미지 등록 >
  const onChangeFileUrls = (fileUrl: string, index: number): void => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  useEffect(() => {
    const images = String(data?.fetchUserLoggedIn.picture);
    if (images !== undefined && images !== null) setFileUrls([images]);
  }, [data]);

  // < 회원정보 수정 >
  const { onClickMyPage } = useOnClickMyPage(
    data,
    fileUrls,
    name,
    setNameError
  );

  return (
    <>
      <B.Wrapper>
        <B.Box>
          <B.Title>회원정보수정</B.Title>
          <B.Line />
          <B.InputBox>
            <B.Label>이메일</B.Label>
            <B.Input
              type="text"
              readOnly={data?.fetchUserLoggedIn.email}
              value={data?.fetchUserLoggedIn.email}
            />
          </B.InputBox>
          <B.InputBox>
            <B.Label>닉네임</B.Label>
            <B.Input
              type="text"
              placeholder="새 닉네임을 입력해 주세요."
              onChange={onChangeName}
              defaultValue={data?.fetchUserLoggedIn.name}
            />
          </B.InputBox>
          <B.InputBox>
            <B.Label>프로필 이미지</B.Label>
            <B.UploadBox>
              {fileUrls.map((el, index) => (
                <Uploads01
                  key={uuidv4()}
                  index={index}
                  fileUrl={el}
                  onChangeFileUrls={onChangeFileUrls}
                />
              ))}
            </B.UploadBox>
          </B.InputBox>
          <B.Line />
          <B.Button onClick={onClickMyPage}>회원 정보 수정</B.Button>
        </B.Box>
      </B.Wrapper>
    </>
  );
}
