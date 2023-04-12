import * as B from "./login.styles";

export default function LoginUI(props) {
  return (
    <>
      <B.Wrapper>
        <B.Title onClick={props.onClickLogo}>
          <B.FireFilledIcon />
          Header
        </B.Title>
        <B.LoginWrapper>
          <B.LoginTie>
            <B.Email placeholder="이메일"></B.Email>
            <B.Password type="password" placeholder="비밀번호"></B.Password>
          </B.LoginTie>
          <B.LoginButton>로그인</B.LoginButton>
        </B.LoginWrapper>
      </B.Wrapper>
    </>
  );
}
