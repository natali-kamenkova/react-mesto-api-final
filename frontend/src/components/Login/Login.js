import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

function Login({isLoggedIn, onLogin }) {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  }
 
  const handleSubmit = (e)=> {
    
    e.preventDefault();
    if(!userData.email || !userData.password) {
      return;
    }
    onLogin(userData.email, userData.password);
    console.log(userData)
    
  }

  if(isLoggedIn) {
    return <Redirect to="/"/>
  }

  return (
    <div  className='login__container '>
      <p className='login__title'>Вход</p>
      <form onSubmit={handleSubmit} className='popup__form login__form'>
        <input
          id='useremail'
          name='email'
          className='popup__input login__input'
          placeholder='Email'
          type='email'
          value={userData.email}
          onChange={handleChange}></input>
        <input
          id='password'
          name='password'
          className='popup__input login__input'
          placeholder='Пароль'
          type='password'
          value={userData.password}
          onChange={handleChange}></input>
        <button type="submit" className="popup__submit login__submit">
          Войти
        </button>
      </form>

    </div>
  )
}

export default Login;