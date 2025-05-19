'use client';
import { FormEvent, useState } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import styles from '../styles/SearchBar.module.scss';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const setQuery = useSearchStore((s) => s.setQuery);
  const fetchResults = useSearchStore((s) => s.fetchResults);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuery(input);
    fetchResults();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
