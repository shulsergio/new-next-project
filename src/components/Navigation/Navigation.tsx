"use client";

import AuthStatus from "../AuthStatus/AuthStatus";
import Link from "next/link";
import css from "./Navigation.module.css";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const FontAwesomeIcon = ({ icon }) => {
  const iconMap = {
    faBars: "☰",
    faXmark: "✕",
  };
  const iconName = icon === "faBars" ? "faBars" : "faXmark";

  return <span className="text-xl font-bold">{iconMap[iconName]}</span>;
};
const faBars = "faBars";
const faXmark = "faXmark";

export default function Navigation() {
  const { data: session, status } = useSession();
  const navName = session?.user?.name || "";
  // const navName = "VASYA";

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
    }
    return () => {
      document.body.classList.remove(css.noScroll);
    };
  }, [isOpen]);

  const navItems = (
    <>
      <Link
        href="/"
        className={css.link}
        onClick={isOpen ? toggleMenu : undefined}
      >
        Home
      </Link>
      <Link
        href="/about"
        className={css.link}
        onClick={isOpen ? toggleMenu : undefined}
      >
        About
      </Link>
    </>
  );
  const navUserItems = (
    <>
      <Link
        href="/user/plans"
        className={css.link}
        onClick={isOpen ? toggleMenu : undefined}
      >
        Promoter plans
      </Link>
      <Link
        href="/user/focus-models"
        className={css.link}
        onClick={isOpen ? toggleMenu : undefined}
      >
        Focus Models
      </Link>
    </>
  );

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <div className={css.desktopLinks}>
          {navItems}
          <div className={css.authStatusContainer}>
            <AuthStatus onMenuAction={toggleMenu} />
          </div>
        </div>
        <button
          className={css.hamburgerButton}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-panel"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </button>
        <div className={css.navName}> {navName}</div>
      </nav>

      <div
        id="mobile-menu-panel"
        className={`${css.mobileMenu} ${isOpen ? css.mobileMenuOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <div className={css.mobileAuthStatus}>
          <AuthStatus onMenuAction={toggleMenu} />
        </div>
        {status === "unauthenticated" ? "" : navUserItems}
        {navItems}
      </div>
    </header>
  );
}

//   return (
//     <nav className={css.nav}>
//       <Link href="/" className={css.link}>
//         HOME
//       </Link>
//       <Link href="/about" className={css.link}>
//         About
//       </Link>
//       <div className={css.authStatusContainer}>
//         <AuthStatus />
//       </div>
//     </nav>
//   );
// }
