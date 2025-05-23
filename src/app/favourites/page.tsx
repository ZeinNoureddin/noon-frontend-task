// app/favorites/page.tsx
"use client";

import commonStyles from "@/styles/Common.module.scss";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { lazy, Suspense } from "react";

// Lazy load the MovieCard component
const MovieCard = lazy(() => import("@/components/MovieCard"));

export default function FavoritesPage() {
  const favs = useFavoritesStore((s) => s.favorites);

  const styles = { ...commonStyles };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        <h1 className={styles.pageHeader}>Your Favourites</h1>
        {favs.length === 0 ? (
          <p className={styles.noResults}>
            You haven’t added any favorites yet.
          </p>
        ) : (
          <div className={styles.films}>
            <Suspense
              fallback={
                <div className={styles.loadingContainer}>
                  <div className={styles.spinner} />
                  <span>Loading favorites...</span>
                </div>
              }
            >
              {favs.map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  poster_path={m.poster_path}
                  release_date={m.release_date}
                  vote_average={m.vote_average}
                />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </main>
  );
}
