import React from "react";
import { useStore } from "../hooks";
import { RegisterFormLayout } from "./register-form-layout";

type FieldName = 'login' | 'email' | 'password';
const validateField = (name: FieldName, value: string) => {
  let error = "";
  const validators = {
    login: () => {
      if (!/^\w*$/.test(value)) {
        error = "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      } else if (value.length > 20) {
        error = "Неверный логин. Должно быть не больше 20 символов";
      }
    },
    email: () => {
      if (!/^[\w@.]*$/.test(value) && value.length !== 0) {
        error = "Неверный email";
      }
    },
    password: () => {
      if (!/^[\d\w_]*$/.test(value)) {
        error = "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      } else if (value.length > 20) {
        error = "Неверный пароль. Должно быть не больше 20 символов";
      }
    },
  };

  if (validators[name]) {
    validators[name]();
  }

  return error;
};

export const RegisterForm: React.FC<{ className?: string }> = () => {
  const { getState, updateState, resetState } = useStore();
  const { login, email, password, loginError, emailError, passwordError } = getState();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(getState());
    resetState();
  };


  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    updateState(name, value);

    
    const error = validateField(name as FieldName, value);
    updateState(`${name}Error`, error || "");
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    let error = "";

    if (name === "login" && (value.length < 3 && value.length !== 0)) {
      error = 'Неправильный логин, должен содержать больше 3 символов';
    } else if (name === "password" && (value.length < 6 && value.length !== 0)) {
      error = 'Неправильный пароль, должен содержать больше 6 символов';
    }

    updateState(`${name}Error`, error);
  };

  const isSubmitDisabled = !!loginError || !!emailError || !!passwordError || login.length === 0 || email.length === 0 || password.length === 0

  return (
    <RegisterFormLayout
      login={login}
      email={email}
      password={password}
      loginError={loginError}
      emailError={emailError}
      passwordError={passwordError}
      onChange={onChange}
      onSubmit={onSubmit}
      onBlur={onBlur}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};
