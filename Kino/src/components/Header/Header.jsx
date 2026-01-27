import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

function Header({ user, onLogout }) {
  const count = useSelector(state => state.favorites.items.length);
  return (
    <div className={styles['header-menu']}>
      <NavLink to="/"><img className={styles['logo']} src="/logo.svg" alt="Логотип" /></NavLink>
      <ul className={styles['header-menu__list']}>
        <li className={styles['header-menu__item']}>
          <NavLink 
            to="/"
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            Поиск фильмов
          </NavLink>
        </li>
        <li className={styles['header-menu__item']}>
          <NavLink 
            to="/favorites"
            className={({ isActive }) => isActive ? styles.active : ''}
          >
            <span>Мои фильмы {count}</span>
          </NavLink>
        </li>
        {user ? (
          <li className={`${styles['header-menu__item']} ${styles['header-menu__onlogout']}`}>
            <span className={styles['header-menu__user']}>
              {user}
              <img src="/user.svg" alt="Пользователь"/>
            </span>
            <a href='#' onClick={(e) => { e.preventDefault(); onLogout(); }}>
              Выйти
            </a>
          </li>
        ) : (
          <li className={`${styles['header-menu__item']} ${styles['header-menu__login']}`}>
            <NavLink 
              to="/login"
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Войти
              <img src="/login.svg" alt="Войти" />
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;