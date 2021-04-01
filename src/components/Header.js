import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

  const [linkState, setLinkState] = React.useState('');

  function changeOfState() {
    if (props.isExit) {
      setLinkState('Выйти');
    } else {
      setLinkState(props.isAuth ? 'Регистрация' : 'Войти')

    }
  }


  React.useEffect(() => {
    changeOfState();
  }, [props.isExit, props.isAuth])
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__wrapper">
        <p className="header__email">{props.email}</p>
        <Link to={props.isAuth ? '/sign-up' : '/sign-in'} onClick={props.handleLink} className="header__link" href="#">{linkState}</Link>
      </div>
    </header>
  );
}

export default Header;