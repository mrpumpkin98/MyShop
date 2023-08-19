import React from "react";
import styled from "@emotion/styled";
import mobilePreparingImg from "assets/img/img_mobile_preparing.png";

const MobilePage = () => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(document.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div>
      {/* <img src={mobilePreparingImg} alt="mobile icon" /> */}
      <p className="title">PC버전으로 접속해주세요</p>
      <p className="description">
        아쉽게도 모바일은 지원하지 않아요😥 <br />
        PC환경에서 테이커스를 이용해주세요!
      </p>
      <button className="link-copy-button" onClick={handleLinkCopy}>
        링크 복사하기
      </button>
    </div>
  );
};

export default MobilePage;
