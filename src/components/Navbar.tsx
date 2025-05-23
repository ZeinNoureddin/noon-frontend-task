"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.scss";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    if (searchOpen) setSearchOpen(false);
  };
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.brand}>
          <Link href="/">The Film Fanatic</Link>
        </div>

        {/* DESKTOP SEARCH */}
        {pathname !== "/" && (
          <div className={`${styles.center} ${styles.searchDesktop}`}>
            <SearchBar small />
          </div>
        )}

        {/* DESKTOP LINKS */}
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/favourites">Favourites</Link>
        </div>

        {/* MOBILE CONTROLS */}
        <div className={styles.mobileIcons}>
          <button
            aria-label="Toggle search"
            onClick={toggleSearch}
            className={styles.iconBtn}
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Toggle menu"
            onClick={toggleMenu}
            className={styles.iconBtn}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {/* MOBILE SEARCH BAR */}
      {searchOpen && (
        <div className={styles.mobileSearch}>
          <SearchBar />
        </div>
      )}

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className={`${styles.mobileMenu} ${styles.links}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/favourites" onClick={() => setMenuOpen(false)}>
            Favourites
          </Link>
        </div>
      )}
    </nav>
  );
}
