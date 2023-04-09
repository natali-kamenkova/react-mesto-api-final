import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function AddPlacePopup({ active, onClose, onAddPlace }) {
  const inputCardName = React.useRef(null);
  const inputCardLink = React.useRef(null);


  function handleSubmit(e) {

    e.preventDefault();

    onAddPlace({

      name: inputCardName.current.value,
      link: inputCardLink.current.value
    });


  }
  return (

    <PopupWithForm active={active} onClose={onClose} title='Новое место' name='cards' onSubmit={handleSubmit} buttonText='Сохранить'>
      <input
        id="popup__span_card-name"
        ref={inputCardName}
        type="text"
        name="name"
        className="popup__input popup__input_type_card-name"
        placeholder="Название"
        minLength={2}
        required=""
      />
      <span className="popup__span popup__span_card-name-error">
        Вы пропустили данное поле
      </span>
      <input
        id="popup__span_card-link"
        ref={inputCardLink}
        type="url"
        name="link"
        className="popup__input popup__input_type_card-link"
        placeholder="Ссылка на картинку"
        required=""
      />
      <span className="popup__span popup__span_card-link-error">
        Введите адрес сайта.
      </span>
    </PopupWithForm>

  )
}

export default AddPlacePopup;