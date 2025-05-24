"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.scss";

export default function SearchBar({ small = false }: { small?: boolean }) {
  const router = useRouter();

  const [input, setInput] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search?query=${encodeURIComponent(input)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${styles.searchForm} ${small ? styles.small : ""}`}
    >
      <div className={styles.inputGroup}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line
            x1="16.656"
            y1="16.657"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to watch?"
          aria-label="Search for movies or shows"
        />
      </div>
    </form>
  );
}
