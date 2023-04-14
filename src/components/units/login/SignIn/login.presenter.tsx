import * as B from "./login.styles";
import Input01 from "../../../../commons/inputs/01-SignIn-top";
import Input02 from "../../../../commons/inputs/02-SignIn-under";
import Button01 from "../../../../commons/buttons/01-SignIn";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";

export default function LoginUI(props) {
  return (
    <>
      <B.Wrapper>
        <B.Title onClick={props.onClickLogo}>
          <B.FireFilledIcon />
          Header
        </B.Title>
        <form onSubmit={wrapFormAsync(props.handleSubmit(props.onClickSubmit))}>
          <B.LoginWrapper>
            <B.LoginTie>
              <Input01
                title="이메일을 입력해주세요."
                register={props.register("email")}
              ></Input01>
              <Input02
                title="비밀번호를 입력해 주세요."
                type="password"
                register={props.register("password")}
              ></Input02>
            </B.LoginTie>
            <Button01 title="로그인" />
          </B.LoginWrapper>
        </form>
      </B.Wrapper>
    </>
  );
}
