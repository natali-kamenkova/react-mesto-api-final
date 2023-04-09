
import logo from '../../images/logo.svg';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Header(props) {

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      <div className='header__links'>
        <Switch>
          <Route exact path='/sign-in'>
            <Link to="/sign-up" className='header__link-singup'>Регистрация</Link>
          </Route>
          <Route exact path='/sign-up'>
            <Link to="/sign-in" className='header__link-singup'>Войти</Link>
          </Route>
          <Route exact path='/'>
            <div>
              <Link to="/email" className='header__link-singup'>{props.email}</Link>
              <button className="header__enter" onClick={props.onLogout}>Выйти</button>
            </div>
          </Route>

        </Switch>


      </div>
    </header>

  )

}
export default Header;


