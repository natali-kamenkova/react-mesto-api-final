import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import api from '../../utils/api';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import Register from '../Register/Register.js';
import { Redirect } from 'react-router-dom';
import Login from '../Login/Login.js';
import * as auth from '../../utils/auth.js';
import { useCallback } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = useState({});
  const [registr, setRegistr] = React.useState(false);
  const jwt = localStorage.getItem('jwt');


  const callBackAuthenticate = useCallback((data) => {
    data.token && localStorage.setItem('jwt', data.token);
    setLoggedIn(true);


  }, [])

  const tokenCheck = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) {
        throw new Error('no token')
      }
      const user = await auth.checkToken(jwt);


      if (!user) {
        throw new Error('invalid user');
      }
      if (user) {
        setLoggedIn(true);
        setUserData(user.data);

      }
    } catch {

    }

  }, [loggedIn]);


  const callBackLogin = useCallback(async (email, password) => {
    try {
      const data = await auth.authorize(email, password);

      if (!data) {
        throw new Error('Неверный майл или пароль')
      }

      callBackAuthenticate(data)
      const userData = { email, password }
      console.log(userData)
      return data;

    } catch {
      setIsInfoTooltipOpen(true)
      setRegistr(false)

    } finally {

    }

  }, [callBackAuthenticate]);

  const callBackRegistr = useCallback(async (email, password) => {
    try {
      const data = await auth.register(email, password)
      // setIsInfoTooltipOpen(true)
      setRegistr(true)
      setTimeout(() => {
        callBackLogin(email, password)
      }, 300)

      return data;
    } catch {
      setRegistr(false);
    } finally { setIsInfoTooltipOpen(true) };
  }, [])

  const callBackLogout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserData({})
  }, [])

  useEffect(() => {
    tokenCheck()

  }, [tokenCheck])



  //запрос на получение карточек
  useEffect(() => {
   if (jwt){
    api.getInitialCards(cards)
    .then((data) => {
      setCards(data);
    })
    .catch(function (err) {
      console.log('Ошибка', err)
    })
   }                              
  }, [loggedIn])
  //обработчик кнопки лайк в карточке
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card._id, isLiked)
      .then((newCard) => {

        setCards((state) => state.map((c) => c._id === newCard._id ? newCard : c));

      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  //обработчик кнопки удалить в карточке
  function handleCardDelete(card) {
    console.log(card)
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((s) => s._id !== card._id))
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  //запрос на получение данных пользователя
  useEffect(() => {
   if(jwt){
    api.getUserInfo(currentUser)
    .then((data) => {
      setCurrentUser(data)


    })
    .catch(function (err) {
      console.log('Ошибка', err)
    })
   }
  }, [loggedIn])
  console.log(currentUser)


  const handleCardClick = (card) => setSelectedCard(card)

  //обработчики открытия попапов
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false)
  }

  // обработчик закрытия попапов Esc
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  //обработчик обновления профайла
  function handleUpdateUser(data) {
    api.editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })

      .catch(function (err) {
        console.log('Ошибка', err)
      })
    console.log(data)


  }
  //обработчик обновления аватара
  function handleUpdateAvatar(data) {


    api.editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
      
  }

  //обработчик добавления карточки

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('Ошибка', err)
      })
  }

  return (
    <div className='body'>
      <CurrentUserContext.Provider value={currentUser}>
        {/* Hello world */}
        <div className="page">

          <Header
            email={currentUser.email}
            onLogout={callBackLogout}
          />

          <Switch>

            <Route path="/sign-up">
              <Register
                isLoggedIn={loggedIn}
                onRegister={callBackRegistr}
              />
            </Route>

            <Route path="/sign-in">
              <Login
                isLoggedIn={loggedIn}
                onLogin={callBackLogin}
              />
            </Route>



            <ProtectedRoute path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
           
          </Switch>
          <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          <Footer />


          <EditProfilePopup active={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup active={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup active={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm title='Вы уверены?' name='delete' />
          <InfoTooltip active={isInfoTooltipOpen} onClose={closeAllPopups} isRegistr={registr} />

        </div>

      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;






