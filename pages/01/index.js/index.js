import { Main, Header, MinBox, Body, Footer, HeaderTop, HeaderMid, HeaderFooter, Announcement, Event, Faq, Qa, One, TWo, Three, Four, BodyOne, BodyTwo, BodyThree, FooterOne, FooterTwo, FooterThree } from '../../../styles/index'

export default function EmotionPage() {

    // 여기는 자바스크립트 쓰는 곳

    return (
        <Main>
            <MinBox>
                <Header>
                    <HeaderTop src="/Group.png"></HeaderTop>
                    <HeaderMid>
                        <One>마이</One>
                        <TWo src="/img-60-profile-image@3x 1.png"></TWo>
                        <Three>엄정아</Three>
                        <Four src="/Group (1).png"></Four>
                    </HeaderMid>
                    <HeaderFooter>
                        <Announcement>공지사항</Announcement>
                        <Event>이벤트</Event>
                        <Faq>FAQ</Faq>
                        <Qa>Q&A</Qa>
                    </HeaderFooter>
                </Header>
                <Body>
                    <BodyOne>
                        <BodyTwo>리뷰 작성은 어떻게 하나요?</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                    <BodyOne>
                        <BodyTwo>리뷰 수정/삭제는 어떻게 하나요?</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                    <BodyOne>
                        <BodyTwo>아이디/비밀번호를 잊어버렸어요</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                    <BodyOne>
                        <BodyTwo>회원탈퇴를 하고싶어요.</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                    <BodyOne>
                        <BodyTwo>출발지 선정은 어떻게 하나요?</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                    <BodyOne>
                        <BodyTwo>비밀번호를 변경하고 싶어요.</BodyTwo>
                        <BodyThree src="/Group (2).png"></BodyThree>
                    </BodyOne>
                </Body>
                <Footer>
                    <FooterOne>
                        <FooterTwo src="Vector (1).png" ></FooterTwo>
                        <FooterThree>홈</FooterThree>
                    </FooterOne>
                    <FooterOne>
                        <FooterTwo src="Vector (2).png" ></FooterTwo>
                        <FooterThree>잇츠로드</FooterThree>
                    </FooterOne>
                    <FooterOne>
                        <FooterTwo src="Vector (3).png" ></FooterTwo>
                        <FooterThree>마이찜</FooterThree>
                    </FooterOne>
                    <FooterOne>
                        <FooterTwo src="Vector (4).png" ></FooterTwo>
                        <FooterThree>마이</FooterThree>
                    </FooterOne>
                </Footer>
            </MinBox>
        </Main>
    )

}