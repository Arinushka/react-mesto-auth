import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {

  const card = props.card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);


  const cardDeleteButtonClassName = (`gallery__button-delete ${isOwn ? '' : 'gallery__button-delete_hidden'}`);
  const cardLikeButtonClassName = (`gallery__button ${isLiked && 'gallery__button_like'}`);

  function handleClick() {
    props.onClick(card)
  }
  function handleLikeClick() {
    props.onCardLike(card)
  }
  function handleDeleteClick() {
    props.onCardDelete(card);
    props.onDeleteClick();
  }

  return (
    <article className="gallery__card">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="gallery__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="gallery__wrapper">
        <h2 className="gallery__name">{card.name}</h2>
        <div className="gallery__button-wrapper">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="gallery__button-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;