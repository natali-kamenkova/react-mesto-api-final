import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <div className={card ? `popup popup_opened` : `popup popup-image`}>
      <div className="popup__container popup-image__container ">
        <img className="popup-image__img" src={card?.link} alt={card?.name} />
        <h2 className="popup__title popup-image__title" >{card?.name}</h2>
        <button className="popup__close" type="button" aria-label="close" onClick={onClose} />
      </div>
    </div>
  );
}
export default ImagePopup;