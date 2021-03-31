import React from 'react';
import InputForm from './InputForm';

function Register() {
  return (
    <div className="passp-content">
      <form className="passp-content__form" noValidate>
        <h2 className="passp-content__title">Регистрация</h2>
        <InputForm className="passp-content__input" placeholder="Email"></InputForm>
        <InputForm className="passp-content__input" placeholder="Пароль"></InputForm>
        <button className="passp-content__button-submit">Зарегистрироваться</button>
      </form>
      <p className="passp-content__check">Уже зарегистрированы? <a className="passp-content__link" href="#">Войти</a></p>
    </div>
  );
}

export default Register;