import React from 'react';

function PopupWithForm({ active, onClose, title, name, children, onSubmit, buttonText }) {

  return (
    <div className={active ? `popup popup_opened` : `popup popup-${name}`}>
      <div className="popup__container popup__container_form">
        <button className="popup__close" type="button" aria-label="close" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          action="#"
          className={`popup__form popup__form_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
//onClick={()=>setActive(false)}

