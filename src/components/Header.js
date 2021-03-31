import React from 'react';
import { Link} from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Link className="header__link" href="#">Войти</Link>
    </header>
  );
}

export default Header;