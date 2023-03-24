import * as B from "./BoardComment.styles";
import { getDate } from '../../../../commons/libraries/utils'

export default function BoardCommentUI(props) {
    return (
        <div>
            <B.Wrapper>
                <B.CardWrapper>
                    <B.Header>
                        <B.HeaderImage src="/images/B.HeaderImage.png"></B.HeaderImage>
                        <B.HeaderTitle>댓글</B.HeaderTitle>
                    </B.Header>
                    <B.InFor>
                        <B.InForWriter type="text" placeholder="작성자" onChange={props.onChangeWriter} />
                        <B.InForPassword type="password" placeholder="비밀번호" onChange={props.onChangePassword} />
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                    </B.InFor>
                    <B.Body>
                        <B.BodyInput type="text" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                            onChange={props.onChangeContents}
                        />
                        <B.BodyNumberTie>
                            <B.BodyNumber>0/100</B.BodyNumber>
                            <B.BodyButton onClick={props.onClickSubmit}>등록하기</B.BodyButton>
                        </B.BodyNumberTie>
                    </B.Body>
                    <B.InFor>
                        <B.InForWriter type="text" placeholder="작성자"></B.InForWriter>
                        <B.InForPassword type="text" placeholder="비밀번호"></B.InForPassword>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                        <B.Scope src="/images/B.Scope.png"></B.Scope>
                    </B.InFor>
                    <B.Body>
                        <B.BodyInput type="text" placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></B.BodyInput>
                        <B.BodyNumberTie>
                            <B.BodyNumber>0/100</B.BodyNumber>
                            <B.BodyButton >수정하기</B.BodyButton>
                        </B.BodyNumberTie>
                    </B.Body>
                    {props.data?.fetchBoardComments.map((el) => (
                        <B.Footer key={el._id}>
                            <B.FooterInfoPicture src="/images/B.FooterInfoPicture.png" ></B.FooterInfoPicture>
                            <B.FooterCommentInfor>
                                <B.CommentNameScope>
                                    <B.CommentName>{el.writer}</B.CommentName>
                                    <B.Scope src="/images/B.Scope.png"></B.Scope>
                                    <B.Scope src="/images/B.Scope.png"></B.Scope>
                                    <B.Scope src="/images/B.Scope.png"></B.Scope>
                                    <B.Scope src="/images/B.Scope.png"></B.Scope>
                                    <B.Scope src="/images/B.Scope.png"></B.Scope>
                                </B.CommentNameScope>
                                <B.CommentContent>{el.contents}</B.CommentContent>
                                <B.CommentRegistrationTime>{getDate(el.createdAt)}</B.CommentRegistrationTime>
                            </B.FooterCommentInfor>
                            <B.FooterEditDelete>
                                <B.CommentEdit src="/images/B.CommentEdit.png"></B.CommentEdit >
                                <B.CommentDelete src="/images/B.CommentDelete.png"></B.CommentDelete>
                            </B.FooterEditDelete>
                        </B.Footer>
                    ))}
                </B.CardWrapper>
            </B.Wrapper>
        </div>
    )
}