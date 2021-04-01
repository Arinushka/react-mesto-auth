import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {

  const [linkState, setLinkState] = React.useState('');

  const history = useHistory();

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    props.onExit(false);
    props.removeEmail('');
    props.isLoggedIn(false);
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

  React.useEffect(() => {
   
    changeOfState();
  }, [props.isExit, props.isAuth])


  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__wrapper">
        <p className="header__email">{props.email}</p>
        <Link to={props.isAuth ? '/sign-up' : '/sign-in'} onClick={handleState} className="header__link" href="#">{linkState}</Link>
      </div>
    </header>
  );
}

export default Header;