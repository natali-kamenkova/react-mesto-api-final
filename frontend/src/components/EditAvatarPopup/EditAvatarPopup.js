import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ active, onClose, onUpdateAvatar }) {

  const inputUserAvatar = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputUserAvatar.current.value
    });
  }
  


  return (

    <PopupWithForm
      active={active}
      onClose={onClose}
      title='Обновить аватар'
      name='avatar'
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input
        id="popup__span_avatar-link"
        ref={inputUserAvatar}
        type="url"
        name="link"
        className="popup__input popup__input_type_avatar-link"
        placeholder="Ссылка на картинку"
        required=""
      />
      <span className="popup__span popup__span_avatar-link-error">
        Введите адрес сайта.
      </span>

    </PopupWithForm>

  )
}

export default EditAvatarPopup;