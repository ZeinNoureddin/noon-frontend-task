"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import styles from "../styles/Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.brand}>
          <Link href="/">The Film Fanatic</Link>
        </div>

        {pathname !== "/" && (
          <div className={styles.center}>
            <SearchBar small />
          </div>
        )}

        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/favourites">Favourites</Link>
        </div>
      </div>
    </nav>
  );
}
