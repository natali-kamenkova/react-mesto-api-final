import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {


  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__reset-btn  ${isOwn ? 'show' : 'element__reset-btn '}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like-btn ${isLiked ? 'element__like-btn_active' : 'element__like-btn'}`)

  function handleLikeClick() {
    onCardLike(card)

  }

  function handleDeleteClick() {
    onCardDelete(card)
  }


  function handleClick() {
    onCardClick(card)
  }
  return (

    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
      <div className="element__group">
        <h2 className="element__name" >{card.name}</h2>
        <div className="element__group-like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <div className="element__like-counter" >{card.likes.length}</div>
        </div>
      </div>
    </div>

  )
}

export default Card