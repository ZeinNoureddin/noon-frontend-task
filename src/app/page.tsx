"use client";

import homeStyles from "@/styles/Home.module.scss";
import commonStyles from "@/styles/Common.module.scss";
import SearchBar from "@/components/SearchBar";
import { useSearchStore } from "@/stores/useSearchStore";
import Image from "next/image";

export default function Home() {
  const styles = { ...commonStyles, ...homeStyles };
  const results = useSearchStore((s) => s.results);

  return (
    <main className={styles.pageWrapper}>
      <section
        aria-labelledby="home-heading"
        className={styles.homePageWrapper}
      >
        <h1 className={styles.homeHeader}>Find your favourite films</h1>
        <SearchBar />
      </section>
    </main>
  );
}
