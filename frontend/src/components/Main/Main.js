import React from 'react';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)


  return (
    <main className="container">
      <div className="profile">
        <div className="profile__items">
          <button className="profile__avatar-btn" onClick={props.onEditAvatar}>
            <img className="profile__avatar" alt="аватар" src={currentUser.avatar} />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-btn" onClick={props.onEditProfile} />
            <h2 className="profile__profession">{currentUser.about}</h2>
          </div>
        </div>
        <button type="button" className="profile__next-popup-btn" onClick={props.onAddPlace} />
      </div>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>

    </main>
  );
}

export default Main;


