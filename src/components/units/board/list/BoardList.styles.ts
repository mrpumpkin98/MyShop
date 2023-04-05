import styled from "@emotion/styled";

export const Table = styled.table`
  width: 1200px;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  margin: auto;
  margin-top: 100px;
`;

export const Tr = styled.tr`
  font-family: "SCDream4";
  &:hover {
    background: #fafafa;
    color: black;
  }
`;

export const Th = styled.th`
  border-bottom: 1px solid #444444;
  padding: 10px;
  background-color: white;
`;

export const Td = styled.td`
  border-bottom: 1px solid #bdbdbd;
  padding: 10px;
  text-align: center;
  color: #4f4f4f;
  cursor: pointer;
  width: 200px;
`;

export const Pagination = styled.div`
  text-align: center;
  margin: auto;
  margin-top: 30px;
`;

export const ButtonTie = styled.div`
  width: 100%;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  height: 25px;
  font-size: 12px;
  background-color: gold;
  border-radius: 4px;
  border: none;
  :hover {
    background-color: #ebc600;
  }
`;

export const Button = styled.button`
  width: 179px;
  height: 45px;
  margin-left: 1000px;
  margin-top: 30px;
  margin-bottom: 80px;
  background-color: #f7f8fa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-family: "SCDream4";

  cursor: pointer;
  :hover {
    background-color: gold;
    border-color: gold;
  }
`;
