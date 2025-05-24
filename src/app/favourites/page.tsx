"use client";

import { useEffect } from "react";
import commonStyles from "@/styles/Common.module.scss";
import loadingStyles from "@/styles/Loading.module.scss";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { lazy, Suspense } from "react";

const MovieCard = lazy(() => import("@/components/MovieCard"));

export default function FavoritesPage() {
  const { favorites: favs, loading, init } = useFavoritesStore();
  const styles = { ...commonStyles, ...loadingStyles };

  useEffect(() => {
    init();
  }, [init]);

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        <h1 className={styles.pageHeader}>Your Favourites</h1>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
          </div>
        ) : favs.length === 0 ? (
          <p className={styles.noResults}>
            You haven’t added any favorites yet.
          </p>
        ) : (
          <div className={styles.films}>
            <Suspense
              fallback={
                <div className={styles.spinnerOverlay}>
                  <div className={styles.spinner} />
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
