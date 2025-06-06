"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Navbar.module.scss";
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

  const addGlassEffect = pathname != "/";

  return (
    <nav
      className={styles.navbar}
      style={{
        background: addGlassEffect ? "var(--glass-bg)" : "transparent",
      }}
    >
      <div className={styles.navContainer}>
        <div className={styles.brand}>
          <Link href="/">The Film Fanatic</Link>
        </div>

        {/* desktop search */}
        {pathname !== "/" && (
          <div className={`${styles.center} ${styles.searchDesktop}`}>
            <SearchBar small />
          </div>
        )}

        {/* desktop links */}
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/favourites">Favourites</Link>
        </div>

        {/* mobile controls */}
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
      {/* mobile search bar */}
      {searchOpen && (
        <div className={styles.mobileSearch}>
          <SearchBar />
        </div>
      )}

      {/* mobile menu */}
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
