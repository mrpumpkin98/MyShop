import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 650px;
  margin: 0px 0px 0px 50px;
  border: 1px solid black;
  padding-top: 80px;
  border-radius: 8px;
  padding-bottom: 100px;
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
  border: none;
`;

export const Title = styled.h2`
  border-bottom: 2px solid black;
  height: 60px;
`;

export const InputWrapper = styled.div`
  padding-top: 40px;
`;

export const Label = styled.div`
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  font-family: "SCDream4";
`;

export const Subject = styled.input`
  width: 500px;
  height: 52px;
  padding-left: 16px;
  border: 1px solid #bdbdbd;
  font-family: "SCDream4";
  :focus {
    outline: none;
    border: 1px solid gold;
  }
`;

export const UploadButton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Button = styled.button`
  width: 210px;
  margin: auto;
  height: 45px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;

  :hover {
    background-color: gold;
    border-color: white;
  }
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #e4e4e4;
  margin: 50px 0px 10px 0px;
`;
