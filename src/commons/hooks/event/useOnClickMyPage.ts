import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../mutations/UseMutationUpdateUser";
import {
  IMutation,
  IMutationUpdateUserArgs,
} from "../../types/generated/types";

export const useOnClickMyPage = (
  data: any,
  fileUrls: any,
  name: any,
  setNameError: any
) => {
  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);
  const onClickMyPage = async (): Promise<void> => {
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
        },
      });
      alert("회원정보수정이 완료되었습니다!");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickMyPage };
};
