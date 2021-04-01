import React from 'react';
import InputForm from './InputForm';
import * as auth from '../utils/auth.js';
import { withRouter } from 'react-router-dom';


function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }


  function handleSubmit(e) {
    e.preventDefault();
    auth.authorize(email, password)
      .then((res) => {
        if (res.statusCode !== 401) {
          props.setEmail(email);
          props.onLoggedIn(true);
          props.onExit(true);
          props.history.push('/profile');
        }
      })
      .catch((err) => {
        props.onFail();
        console.log(err)
      }
      );
  }
  return (
    <div className="passp-content" >
      <form className="passp-content__form" noValidate onSubmit={handleSubmit}>
        <h2 className="passp-content__title">Вход</h2>
        <InputForm onChange={handleEmail} value={email} className="passp-content__input" placeholder="Email" type="email"></InputForm>
        <InputForm onChange={handlePassword} value={password} className="passp-content__input" placeholder="Пароль" type="password"></InputForm>
        <button className="passp-content__button-submit" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default withRouter(Login);