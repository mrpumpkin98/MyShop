import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 500px;
  height: 100vh;
  border: 1px solid black;
  border: none;
  padding-top: 120px;
`;

export const Box = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 50px;
  padding-right: 50px;
`;

export const Title = styled.h1``;

export const InputBox = styled.div`
  padding-top: 20px;
`;

export const Label = styled.p`
  padding-bottom: 18px;
  font-size: 16px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  padding-left: 16px;
  border: 2px solid black;
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const UploadBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  font-size: 20px;
  padding: 15px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-family: "Arita-SemiBold";
  margin: auto;
  cursor: pointer;
  :hover {
    background-color: #e7e7e7;
  }
`;

export const Line = styled.div`
  width: 100%;
  border: 1px solid black;
  margin: 30px 0px 30px 0px;
`;
