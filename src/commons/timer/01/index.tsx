import React, { useState, useEffect } from "react";
import Countdown from "react-countdown";
import styled from "@emotion/styled";
import * as B from "./styles";

// 60분(1시간)을 밀리초로 변환하여 상수로 지정
const TIMER_DURATION = 60 * 60 * 1000;

// 스타일드 컴포넌트를 사용해 span 요소를 스타일링하는 Time 컴포넌트 생성
const Time = styled.span`
  font-size: 15px;
  font-family: "SCDream4";
  color: black;
`;

export default function Timer() {
  // 로컬스토리지에서 만료 타임스탬프 정보를 가져오거나
  // 새로운 만료 타임스탬프를 현재 시간 + TIMER_DURATION 값으로 초기화
  const [expiryTimestamp, setExpiryTimestamp] = useState(() => {
    const storedTimestamp = localStorage.getItem("expiryTimestamp");
    if (storedTimestamp) {
      return parseInt(storedTimestamp);
    } else {
      return Date.now() + TIMER_DURATION;
    }
  });

  // 만료 타임스탬프 정보가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("expiryTimestamp", expiryTimestamp.toString());
  }, [expiryTimestamp]);

  // 카운트다운이 완료되면 만료 타임스탬프를 현재 시간 + TIMER_DURATION 값으로 업데이트
  const handleComplete = () => {
    setExpiryTimestamp(Date.now() + TIMER_DURATION);
  };

  return (
    <div>
      <Countdown
        date={expiryTimestamp}
        onComplete={handleComplete}
        renderer={({ minutes, seconds, completed }) => {
          if (!completed && minutes === 0 && seconds === 1) {
            localStorage.clear();
            window.location.reload();
          }
          return (
            <B.Time>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </B.Time>
          );
        }}
      />
    </div>
  );
}
