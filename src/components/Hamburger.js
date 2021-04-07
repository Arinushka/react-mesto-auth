import React from 'react';
import { Link, withRouter } from 'react-router-dom';

 export const Hamburger = (props) => {
	const classNameHamburger = `header__wrapper_hamburger header__wrapper_visible ${!props.loggedIn && 'header__wrapper_hidden'}`;
	return (
		<>
			{props.isHamburger && <div className={classNameHamburger}>
				<p className="header__email_hamburger">{props.email}</p>
				<Link
					className="header__link header__link_exit"
					onClick={props.onHandleState}>
					{props.linkState}
				</Link>
			</div>}
			{props.loggedIn && <header className="header__hamburger">
				<div className="header__logo"></div>
				<button className={`header__menu ${props.isHamburger && 'header__menu_exit'}`} onClick={props.onSetHamburger}></button>
			</header>}
		</>
	);
}

export default withRouter(Hamburger);