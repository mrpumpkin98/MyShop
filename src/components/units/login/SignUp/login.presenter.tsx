import * as B from "./login.styles";
import Input03 from "../../../../commons/inputs/03-SignUp";
import Button02 from "../../../../commons/buttons/02-SignUp";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";

export default function LoginUI(props) {
  return (
    <>
      <B.Title onClick={props.onClickLogo}>
        <B.FireFilledIcon />
        Header
      </B.Title>
      <B.Wrapper>
        <form onSubmit={wrapFormAsync(props.handleSubmit(props.onClickLogin))}>
          <B.LoginWrapper>
            <B.LoginTie>
              <B.Label>이메일</B.Label>
              <Input03
                title="이메일을 입력해주세요."
                register={props.register("email")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.email?.message}
              </B.Error>
              <B.Label>비밀번호</B.Label>
              <Input03
                title="비밀번호를 입력해 주세요."
                type="password"
                register={props.register("password")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.password?.message}
              </B.Error>
              <B.Label>비밀번호 확인</B.Label>
              <Input03
                title="비밀번호를 한번 더 입력해 주세요."
                type="password"
                register={props.register("password2")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.password2?.message}
              </B.Error>
              <B.Label>닉네임</B.Label>
              <Input03
                title="별명을 입력해 주세요."
                register={props.register("name")}
              ></Input03>
              <B.Error style={{ color: "red" }}>
                {props.formState.errors.username?.message}
              </B.Error>
            </B.LoginTie>
            <Button02 title="회원가입하기" isActive={props.formState.isValid} />
          </B.LoginWrapper>
        </form>
      </B.Wrapper>
    </>
  );
}
