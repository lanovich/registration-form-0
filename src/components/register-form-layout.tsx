import React, { useRef } from "react";
import styles from './register-form.module.css'

interface RegisterFormProps {
  login: string;
  email: string;
  password: string;
  loginError: string,
  emailError: string,
  passwordError: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  isSubmitDisabled: boolean;
}

export const RegisterFormLayout: React.FC<RegisterFormProps> = ({
  login,
  email,
  password,
  loginError,
  emailError,
  passwordError,
  onChange,
  onSubmit,
  onBlur,
  isSubmitDisabled,
}) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
  return (
    <div className={styles.formContainer}>
      <header>Форма регистрации</header>

      <form id="form" className={styles.topBefore} onSubmit={onSubmit}>
        <input
          type="text"
          name="login"
          value={login}
          placeholder="Введите логин"
          onChange={onChange}
          onBlur={onBlur}
        />
        
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Введите почту"
          onChange={onChange}
          />
      
      
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Введите пароль"
          onChange={onChange}
          onBlur={onBlur}
          />
        <button id="submit" type="submit" disabled={!!isSubmitDisabled} ref={submitButtonRef}>Отправить</button>
      </form>
        {loginError && <div className={styles.error}>{loginError}</div>}
        {emailError && <div className={styles.error}>{emailError}</div>}
        {passwordError && <div className={styles.error}>{passwordError}</div>}
    </div>
  );
};
