import { NavLink } from "react-router-dom";

import { navLinks } from "../constants/NavLinks";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <p className={styles["nav-text"]}>TODO List!</p>
      {navLinks.map((e, i) => (
        <NavLink
          key={i}
          to={e.link}
          className={({ isActive }) =>
            isActive
              ? `${styles["nav-link"]} ${styles["nav-link-active"]}`
              : styles["nav-link"]
          }
        >
          {e.title}
        </NavLink>
      ))}
    </nav>
  );
}
export default Navbar;
