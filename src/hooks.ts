import { useState } from "react";

const initialState = {
  login: "",
  email: "",
  password: "",
  loginError: "",
  emailError: "",
  passwordError: "",
};

export const useStore = () => {
  const [state, setState] = useState(initialState);
  
  const updateState = (fieldName: string, newValue: string) => {
    setState((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
      [`${fieldName}Error`]: "",
    }));
  };

  const resetState = () => {
    setState(initialState)
  }

  return {
    getState: () => state,
    updateState,
    resetState
  };
};