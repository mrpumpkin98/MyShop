import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import * as B from "./signup.styles";
import Input03 from "../../../../commons/inputs/03-SignUp";
import Button02 from "../../../../commons/buttons/02-SignUp";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import { CREATE_USER } from "../../../../commons/hooks/mutations/UseMutationCreateUser";

export const schema = yup.object({
  email: yup
    .string()
    .email("올바른 이메일 형식이 아닙니다!")
    .required("이메일을 입력하세요!"),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자리 이상입니다!")
    .max(16, "비밀번호는 최대 16자리입니다!")
    .required("패스워드를 입력하세요!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[^\s]*$/,
      "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
    ),
  password2: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다!")
    .required("필수 입력 값입니다!"),
  username: yup
    .string()
    .min(2, "닉네임은 최소 2글자 이상입니다!")
    .max(10, "닉네임은 최대 10글자입니다!")
    .matches(
      /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
    ),
});

export default function LoginNewPage(): JSX.Element {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [createUser] = useMutation(CREATE_USER);

  const onClickLogo = () => {
    void router.push("/Board");
  };

  const onClickLogin = async (data: any): Promise<void> => {
    try {
      // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
      const result = await createUser({
        variables: {
          createUserInput: {
            email: String(data.email),
            password: String(data.password),
            name: String(data.name),
          },
        },
      });

      alert("화원가입에 성공했습니다!");

      void router.push(`/Login`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      <B.Wrapper>
        <B.Logo src="/images/icons/로고.png" onClick={onClickLogo} />
        <B.Form onSubmit={wrapFormAsync(handleSubmit(onClickLogin))}>
          <B.SignUpWrapper>
            <B.SignUpBox>
              <B.Label>이메일</B.Label>
              <Input03
                title="이메일을 입력해주세요."
                register={register("email")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {formState.errors.email?.message}
              </B.Error>
              <B.Label>비밀번호</B.Label>
              <Input03
                title="비밀번호를 입력해 주세요."
                type="password"
                register={register("password")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {formState.errors.password?.message}
              </B.Error>
              <B.Label>비밀번호 확인</B.Label>
              <Input03
                title="비밀번호를 한번 더 입력해 주세요."
                type="password"
                register={register("password2")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {formState.errors.password2?.message}
              </B.Error>
              <B.Label>닉네임</B.Label>
              <Input03
                title="별명을 입력해 주세요."
                register={register("name")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {formState.errors.username?.message}
              </B.Error>
            </B.SignUpBox>
            <Button02 title="회원가입하기" isActive={formState.isValid} />
          </B.SignUpWrapper>
        </B.Form>
      </B.Wrapper>
    </>
  );
}
