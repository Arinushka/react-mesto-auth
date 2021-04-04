import React from 'react';
import { Link } from 'react-router-dom';

function Hamburger(props) {

	return (
		<>
			<div className={`header__wrapper_hamburger ${props.isHamburger && 'header__wrapper_visible'} ${!props.loggedIn && 'header__wrapper_hidden'}`} >
				<p className="header__email_hamburger">{props.email}</p>
				<Link
					to={(props.isAuth && !props.isExit) ? (!props.isAuth ? '/sign-up' : '/sign-in') : '/sign-in'}
					className="header__link header__link_exit"
					onClick={props.onHandleState}>
					{props.linkState}
				</Link>

			</div>
			<header className={`header__hamburger ${!props.loggedIn && 'header__wrapper_hidden'}`}>
				<div className="header__logo"></div>
				<button className={`header__menu ${props.isHamburger && 'header__menu_exit'}`} onClick={props.onSetHamburger}></button>
			</header>
		</>
	);
}

export default Hamburger;