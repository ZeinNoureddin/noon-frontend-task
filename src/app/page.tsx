'use client';

import styles from '@/styles/Home.module.scss';
import SearchBar from '@/components/SearchBar';
import { useSearchStore } from '@/stores/useSearchStore';
import Image from 'next/image';

export default function Home() {
  const results = useSearchStore((s) => s.results);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {/* Left pane */}
        {/* <div className={styles.left}> */}
          <h1 className={styles.siteTitle}>Find your favourite films</h1>
          <SearchBar />
        {/* </div> */}

      </div>
    </div>
  );
}