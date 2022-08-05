import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

import { navLinks } from '../constants/NavLinks';
import styles from './Navbar.module.css';

import { logoutUser } from '../features/auth/authSlice';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentUser = useAppSelector((state) => state.authReducer.currentUser);

  const onLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <p className={styles['nav-text']}>TODO List!</p>
      {navLinks.map((e, i) => (
        <NavLink
          key={i}
          to={e.link}
          className={({ isActive }) =>
            isActive
              ? `${styles['nav-link']} ${styles['nav-link-active']}`
              : styles['nav-link']
          }
        >
          {e.title}
        </NavLink>
      ))}
      {!currentUser && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles['nav-link']} ${styles['nav-link-active']} ${styles['login']}`
              : `${styles['nav-link']} ${styles['login']}`
          }
          to={'/login'}
        >
          Login
        </NavLink>
      )}
      {currentUser && (
        <>
          <button onClick={onLogout} className={styles.logout}>
            Logout
          </button>
          {currentUser && (
            <p className={styles.user}>
              Logged as: <strong>{currentUser!.name}</strong> | Role:
              <strong>{currentUser!.role}</strong>
            </p>
          )}
        </>
      )}
    </nav>
  );
}
export default Navbar;
