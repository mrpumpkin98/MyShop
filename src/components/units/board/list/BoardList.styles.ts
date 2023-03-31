import styled from "@emotion/styled";

export const Table = styled.table`
  width: 1200px;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  margin-top: 100px;
  margin-left: 100px;
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
  width: 200px;
  height: 50px;
  margin-left: 1100px;
  margin-top: 30px;
  border: 1px solid gold;
  background-color: white;
  border-radius: 4px;
  font-size: 17px;
  font-family: "Jalnan";
  margin-bottom: 50px;
  color: gold;

  cursor: pointer;
  :hover {
    background-color: gold;
    color: white;
  }
`;
