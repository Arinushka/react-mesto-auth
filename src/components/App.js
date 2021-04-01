import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';
import * as auth from '../utils/auth.js';


function App(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '' });
  const [isPopupWithImageOpen, setIsPopupWithImageOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonSave, setButtonSave] = React.useState({ isLoad: false, buttonTitle: 'Сохранить' });
  const [buttonAdd, setButtonAdd] = React.useState({ isLoad: false, buttonTitle: 'Создать' });
  const [buttonDelete, setButtonDelete] = React.useState({ isLoad: false, buttonTitle: 'Да' });

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isButtonEdditProfile, setIsButtonEdditProfile] = React.useState(false);
  const [isButtonAddPlace, setIsButtonAddPlace] = React.useState(false);
  const [isButtonAvatar, setIsButtonAvatar] = React.useState(false);

  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(true);
  const [exit, setExit] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleButton(isLoad, buttonTitle, setState) {
    setState({ isLoad: isLoad, buttonTitle: buttonTitle })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleSuccessPopupClick() {
    setIsSuccessPopupOpen(true);
  }

  function handleFailPopupClick() {
    setIsFailPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsPopupWithImageOpen(false);
    setIsFailPopupOpen(false);
    setIsSuccessPopupOpen(false);
    document.removeEventListener('keydown', escClose);
  }
  function escClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleEscClose(isOpen) {
    if (isOpen) {
      document.addEventListener('keydown', escClose)
    }
  }

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPopupWithImageOpen(true)
  }

  function handleDeleteCard(card) {
    setSelectedCard(card)
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err);
      })
    setLoading(true);
    api.getInitialCards()
      .then((data) => {
        setCards(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    handleButton(true, 'Удаление...', setButtonDelete)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(item => item._id !== card._id);
        handleButton(false, 'Да', setButtonDelete);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateUser({ name, about }) {
    handleButton(true, 'Сохранение...', setButtonSave);
    api.setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        handleButton(false, 'Сохранить', setButtonSave);
        closeAllPopups();

      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    handleButton(true, 'Сохранение...', setButtonSave);
    api.updateAvatarImage(avatar)
      .then((data) => {
        setCurrentUser(data);
        handleButton(false, 'Сохранить', setButtonSave);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlace({ name, link }) {
    handleButton(true, 'Создание...', setButtonAdd);
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleButton(false, 'Создать', setButtonAdd);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            props.history.push('/')
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLink() {
    setIsAuth(!isAuth);
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        removeEmail={setEmail}
        isLoggedIn={setLoggedIn}
        isExit={exit}
        onExit={setExit}
        email={email}
        handleLink={handleLink}
        isAuth={isAuth} />
      <Switch>
        <ProtectedRoute
          exact = 'exact'
          path="/"
          component={Main}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteClick={handleDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          isLoading={loading}
          loggedIn={loggedIn} />
        <Route exact path="/sign-in">
          <Login
            onExit={setExit}
            setEmail={setEmail}
            onLoggedIn={setLoggedIn}
            onFail={handleFailPopupClick} />
        </Route>
        <Route exact path="/sign-up">
          <Register
            isAuth={isAuth}
            handleLink={handleLink}
            onSuccess={handleSuccessPopupClick} />
        </Route>
        <Route >
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      {loggedIn && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        onUpdateUser={handleUpdateUser}
        buttonTitle={buttonSave}
        isButtonActive={isButtonEdditProfile}
        onButtonActive={setIsButtonEdditProfile} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        onAddPlace={handleAddPlace}
        buttonTitle={buttonAdd}
        isButtonActive={isButtonAddPlace}
        onButtonActive={setIsButtonAddPlace} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        onUpdateAvatar={handleUpdateAvatar}
        buttonTitle={buttonSave}
        isButtonActive={isButtonAvatar}
        onButtonActive={setIsButtonAvatar} />
      <DeletePopup
        card={selectedCard}
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        onCardDelete={handleCardDelete}
        buttonTitle={buttonDelete} />
      <ImagePopup
        isOpen={isPopupWithImageOpen}
        card={selectedCard}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose} />
      <InfoTooltip
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        src={successImage}
        title="Вы успешно зарегистрировались!" />
      <InfoTooltip
        isOpen={isFailPopupOpen}
        onClose={closeAllPopups}
        escClose={handleEscClose}
        overlayClose={handleOverlayClose}
        src={failImage}
        title="Что-то пошло не так!
        Попробуйте ещё раз." />
    </CurrentUserContext.Provider>
  );

}

export default withRouter(App);