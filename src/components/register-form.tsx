import React from "react";
import { useStore } from "../hooks";
import { RegisterFormLayout } from "./register-form-layout";

type FieldName = 'login' | 'email' | 'password' | 'confirmPassword';

const validateField = (name: FieldName, value: string, password?: string) => {
  let error = "";
  const validators = {
    login: () => {
      if (value.length === 0) {
        error = "Логин не должен быть пустым";
      }
    },
    email: () => {
      if (!/^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/.test(value) && value.length !== 0) {
        error = "Неверный email";
      }
    },
    password: () => {
      if (!/^[\d\w_]*$/.test(value)) {
        error = "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
      } else if (value.length < 6) {
        error = "Неверный пароль. Должен содержать не менее 6 символов";
      }
    },
    confirmPassword: () => {
      if (value !== password) {
        error = "Пароли не совпадают";
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
  const { login, email, password, confirmPassword, loginError, emailError, passwordError, confirmPasswordError } = getState();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(getState());
    resetState();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    updateState(name, value);

    const error = validateField(name as FieldName, value, password);
    updateState(`${name}Error`, error);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    let error = "";
    if (name === "login" && value.length === 0) {
      error = 'Логин не должен быть пустым';
    } else if (name === "email" && value.length === 0) {
      error = 'Email не должен быть пустым';
    } else if (name === "password") {
      error = validateField('password', value);
    } else if (name === "confirmPassword") {
      error = validateField('confirmPassword', value, password);
    }

    updateState(`${name}Error`, error);
  };

  const isSubmitDisabled =
    !!loginError || !!emailError || !!passwordError || !!confirmPasswordError ||
    login.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0;

  return (
    <RegisterFormLayout
      login={login}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      loginError={loginError}
      emailError={emailError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      onChange={onChange}
      onSubmit={onSubmit}
      onBlur={onBlur}
      isSubmitDisabled={isSubmitDisabled}
    />
  );
};
