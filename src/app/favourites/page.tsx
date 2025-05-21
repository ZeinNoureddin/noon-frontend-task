// app/favorites/page.tsx
"use client";

// import favouriteStyles from "@/styles/Favourites.module.scss";
import commonStyles from "@/styles/Common.module.scss";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const favs = useFavoritesStore((s) => s.favorites);
  const remove = useFavoritesStore((s) => s.removeFavorite);

  let styles = {
    ...commonStyles,
    // , ...favouriteStyles
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        <h1 className={styles.siteTitle}>Your Favorites</h1>
        {favs.length === 0 ? (
          <p className={styles.noResults}>
            You haven’t added any favorites yet.
          </p>
        ) : (
          <div className={styles.films}>
            {favs.length === 0 ? (
              <p className={styles.noResults}>No films found.</p>
            ) : (
              favs.map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  poster_path={m.poster_path}
                  release_date={m.release_date}
                  vote_average={m.vote_average}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
//               className={styles.favButton}
