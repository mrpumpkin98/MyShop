import { createStore, combineReducers } from "redux";

// Action 생성 함수
export const setLoggedIn = () => {
  return {
    type: "SET_LOGGED_IN",
  };
};

export const setLoggedOut = () => {
  return {
    type: "SET_LOGGED_OUT",
  };
};

export const setCountUp = () => {
  return {
    type: "SET_COUNT_UP",
  };
};

export const setCountDown = () => {
  return {
    type: "SET_COUNT_DOWN",
  };
};

export const setCountReset = () => {
  return {
    type: "SET_COUNT_RESET",
  };
};

// 로그인 상태를 관리하는 Reducer
const authReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

const counter = (count = { isCounter: 0 }, action) => {
  switch (action.type) {
    case "SET_COUNT_UP":
      return {
        ...count,
        isCounter: count.isCounter + 1,
      };
    case "SET_COUNT_DOWN":
      return {
        ...count,
        isCounter: count.isCounter - 1,
      };
    case "SET_COUNT_RESET":
      return {
        ...count,
        isCounter: (count.isCounter = 0),
      };
    default:
      return count;
  }
};

// 리듀서들을 합침
const rootReducer = combineReducers({
  auth: authReducer,
  counter: counter,
});

// 스토어 생성
const store = createStore(rootReducer);

export default store;
