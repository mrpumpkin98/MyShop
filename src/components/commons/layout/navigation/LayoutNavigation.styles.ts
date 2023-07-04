import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 64px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

export const MenuItem = styled.div`
  font-family: "Arita-SemiBold";
  margin: 0px 60px;
  cursor: pointer;
  padding: 22px 15px;

  :hover {
    border-bottom: 3px solid gold;
  }
`;
