import styled from "@emotion/styled";

export const Table = styled.table`
width: 1200px;
    border-top: 1px solid #444444;
    border-collapse: collapse;
    margin-top: 100px;
    margin-left: 100px;
`;

export const Tr = styled.tr`
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
    border-bottom: 1px solid #BDBDBD;
    padding: 10px;
    text-align: center;
    color: #4F4F4F;
cursor: pointer;

`;

export const ButtonTie = styled.div`
width: 100%;
`;


export const Button = styled.div`
width: 200px;
margin-left: 1100px;
margin-top: 30px;
    background-color: #f7f8fa;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
cursor: pointer;
:hover {
    background-color: gold;
    border-color: white;
  }

`;

