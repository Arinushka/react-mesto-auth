import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Hamburger} from './Hamburger';

function Header(props) {

  const [linkState, setLinkState] = React.useState('');

  function signOut() {
    props.onSignIn();
  }

  function changeOfState() {
    if (props.isExit) {
      setLinkState('Выйти');
    } else {
      setLinkState(props.isAuth ? 'Регистрация' : 'Войти')
    }
  }

  function handleState() {
    if (props.isExit) {
      signOut();
    } else {
      props.handleLink();
    }
  }

  function handleHamburger() {
    props.onHamburger(!props.isHamburger);
  }
  
  React.useEffect(() => {
    changeOfState();
  }, [props.isExit, props.isAuth])

  React.useEffect(() => {
    if (props.loggedIn) props.onExit(true)
  }, [props.loggedIn])

  return (
    <header className="header">
      <Hamburger
        linkState={linkState}
        email={props.email}
        onSetHamburger={handleHamburger}
        isHamburger={props.isHamburger}
        isExit={props.exit}
        isAuth={props.isAuth}
        onHandleState={handleState}
        loggedIn={props.loggedIn} />
      <div className={`header__desktop ${!props.loggedIn && 'header__desktop_visible'}`}>
        <div className="header__logo"></div>
        <div className="header__wrapper">
          <p className="header__email">{props.email}</p>
          <Link
            to={(props.isAuth && !props.isExit) ? (props.isAuth ? '/sign-up' : '/sign-in') : '/sign-in'}
            onClick={handleState}
            className={`header__link ${props.isExit && 'header__link_exit'}`}
            href="#">{linkState}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default withRouter(Header);