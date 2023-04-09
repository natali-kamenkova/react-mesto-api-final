export const profilePopup = document.querySelector('.popup-profile');
export const cardPopup = document.querySelector('.popup-cards');
export const imgPopup = document.querySelector('.popup-image');
export const avatarPopup = document.querySelector('.popup-avatar')
export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const cardPopupBtn = document.querySelector('.profile__next-popup-btn');
export const btnProfilePopupClose = document.querySelector('.popup__close');
export const profileInputName = document.querySelector('.popup__input_type_name');
export const profileInputJob = document.querySelector('.popup__input_type_job');
export const profilePopupForm = document.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__profession');
export const cardsContainer = document.querySelector('.elements');
export const btnCardPopupClose = cardPopup.querySelector('.popup__close');
export const cardPopupForm = cardPopup.querySelector('.popup__form');
export const cardPopupInputName = cardPopup.querySelector('.popup__input_type_card-name');
export const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_card-link');
export const templateElement = document.querySelector('#card-template').content.querySelector('.element');
export const imgPopupPicture = imgPopup.querySelector('.popup-image__img');
export const imgPopupName = imgPopup.querySelector('.popup-image__title');
export const btnImgPopupClose = imgPopup.querySelector('.popup__close');
export const cardPopupSubmitBtn = cardPopup.querySelector('.popup__submit');
export const deletPopupSubmitBtn = document.querySelector('.popup-delete__submit');
export const profileAvatar = document.querySelector('.profile__avatar');
export const openAvatarPopupBtn = document.querySelector('.profile__avatar-btn')
export const avatarPopupForm = avatarPopup.querySelector('.popup__form')
export const avatarPopupSubmitBtn = avatarPopup.querySelector('.popup__submit');
export const avatarPopupInput = avatarPopup.querySelector('.popup__input')
export const profilePopupSubmitBtn = profilePopup.querySelector('.popup__submit');



export const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'c14fd4d2-b83b-4faf-994c-ea33775685d1',
    "Content-Type": "application/json"
  }
}


export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_active'

}

export const selectorTemplate = '#card-template';
export const containerSelector = '.elements';
export const popupSelector = '.popup';
export const popupProfileSelector ='.popup-profile';
export const popupCardSelector = '.popup-cards';
export const popupImageSelector = '.popup-image';
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__profession';
export const profileFormSelector = '.popup__form_profile';
export const cardFormSelector = '.popup__form_card';
export const popupDeleteSelector = '.popup-delete';
export const popupAvatarSelector = '.popup-avatar';
export const avatarFormSelector = '.popup__form_avatar'
export const profileAvatarSelector = '.profile__avatar'

export const initialCards = [

  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Яффо',
    link: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/4ef76ebb-714e-460c-886f-fc514226d278/'
  },

  {
    name: 'Лаба',
    link: 'https://anapacity.com/images/articles/big/reka-laba.jpg'
  },

  {
    name: 'Адыгея',
    link: 'https://kurort.yuga.ru/media/b2/f2/photo_2020-01-28_122338__k4d0vn5.jpg'
  },

  {
    name: 'Ростов-на-Дону',
    link: 'https://34travel.me/media/upload/images/2019/march/rostov-na-donu/new/Depositphotos_201004458_s-2019.jpg'
  }
];