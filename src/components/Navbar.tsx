// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import SearchBar from "./SearchBar"; // your existing SearchBar, will be smaller here
import styles from "../styles/Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* 1) Brand on the left */}
        <div className={styles.brand}>
          <Link href="/" aria-label="Go to homepage">
            The Film Fanatic
          </Link>
        </div>

        {/* 2) Search in the center */}
        <div className={styles.center}>
          {/* Pass a prop to make it smaller, or override via CSS */}
          <SearchBar small />
        </div>

        {/* 3) Links on the right */}
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/favourites">Favourites</Link>
        </div>
      </div>
    </nav>
  );
}
