import React from 'react';
import InputForm from './InputForm';

function Login() {
  return (
    <div className="passp-content">
    <form className="passp-content__form" noValidate>
      <h2 className="passp-content__title">Вход</h2>
      <InputForm className="passp-content__input" placeholder="Email"></InputForm>
      <InputForm className="passp-content__input" placeholder="Пароль"></InputForm>
      <button className="passp-content__button-submit">Войти</button>
    </form>
  </div>
  );
}

export default Login;