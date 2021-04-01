import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__wrapper">
        <p className="header__email">none@mail.ru</p>
      <Link to={props.isAuth ? '/sign-up' : '/sign-in'} onClick={props.handleLink} className="header__link" href="#">{props.isAuth ? 'Регистрация':'Войти'}</Link>
      </div>
    </header>
  );
}

export default Header;