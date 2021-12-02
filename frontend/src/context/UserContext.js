import React, { createContext, useReducer } from "react";
export const UserInfo = createContext();
const initialState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const baseUrl = "http://localhost:4000/api";

function reducer(state = initialState, action) {
  switch (action.type) {
    case "USER_INFO":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

export const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserInfo.Provider value={{ state, dispatch }}>
      {children}
    </UserInfo.Provider>
  );
};
