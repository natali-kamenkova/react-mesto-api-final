import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({ active, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userDescription, setUserDescription] = useState(currentUser.about);

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [active]);

  function handleChange(e) {
    if (e.target.name === 'name') {
      setUserName(e.target.value)
    }
    if (e.target.name === 'job') {
      setUserDescription(e.target.value)
    }
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: userName,
      about: userDescription,
    });
  }

  return (

    <PopupWithForm
      active={active}
      onClose={onClose}
      title='Редактировать профиль'
      name='profile' onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input
        id="popup__span_name"
        onChange={handleChange}
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        value={userName || ''}
        minLength={2}
        maxLength={40}
        required=""
      />
      <span className="popup__span popup__span_name-error" />
      <input
        id="popup__span_job"
        onChange={handleChange}
        type="text"
        className="popup__input popup__input_type_job"
        name="job"
        value={userDescription || ''}
        minLength={2}
        maxLength={200}
        required=""
      />
      <span className="popup__span popup__span_job-error" />
    </PopupWithForm>

  )
}

export default EditProfilePopup;