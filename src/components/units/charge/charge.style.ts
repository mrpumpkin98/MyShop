import styled from "@emotion/styled";
export const Wrapper = styled.div`
  width: 900px;
  height: 100vh;
`;

export const Main = styled.main`
  width: 550px;
  height: 500px;
  border: 1px solid black;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0px 0px 10px #bdbdbd;
  border-radius: 8px;
  margin-top: 25%;
`;

export const InputBox = styled.div``;

export const Select = styled.select`
  width: 400px;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: #ffffff;
  padding: 0px 30px;
  margin-bottom: 30px;
  appearance: none;
  border: 2px solid black;
  cursor: pointer;
`;

export const ChargeButton = styled.button`
  width: 400px;
  height: 70px;
  font-size: 25px;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-bottom: 50px;
  font-family: "Arita-SemiBold";
  cursor: pointer;
  background-color: gold;
`;

export const Logo = styled.img`
  width: 250px;
  cursor: pointer;
`;
