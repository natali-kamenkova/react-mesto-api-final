import React, { useState } from 'react';
import {Redirect, Link } from 'react-router-dom';

function Register({isLoggedIn,onRegister}){

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    let{email,password} = userData;
    onRegister(email,password);
    
  }
  if(isLoggedIn) {
    return <Redirect to="/" />
  }


  return(
    <div className='login__container '>
    <p className='login__title'>Регистрация</p>
    <form className='popup__form login__form' onSubmit={handleSubmit}>
      <input 
      name='email'
      value={userData.email}
      className='popup__input login__input' 
      placeholder='Email' 
      type='email'
      onChange={handleChange}
      ></input>
      <input 
      name='password'
      className='popup__input login__input' 
      placeholder='Пароль'
      value={userData.password} 
      type='password'
      onChange={handleChange}
      ></input>
      <button type="submit" className="popup__submit login__submit">
      Зарегистрироваться
      </button>
      <p className='login__link'>Уже зарегистрированы?<Link className='login__link' to='sign-in'> Войти</Link></p>
    </form>

  </div>
  )
}
export default Register;