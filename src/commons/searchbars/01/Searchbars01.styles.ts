import { GitlabFilled } from "@ant-design/icons";
import styled from "@emotion/styled";

export const Searchbar = styled.div`
  width: 776px;
  height: 52px;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FireFilledIcon = styled(GitlabFilled)`
  color: gold;
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: orange;
  }
`;

export const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;
  margin: 0px 20px;
`;
