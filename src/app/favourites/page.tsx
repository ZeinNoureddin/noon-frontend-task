// app/favorites/page.tsx
"use client";

import styles from "@/styles/Favourites.module.scss";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const favs = useFavoritesStore((s) => s.favorites);
  const remove = useFavoritesStore((s) => s.removeFavorite);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        <h1 className={styles.siteTitle}>Your Favorites</h1>
        {favs.length === 0 ? (
          <p className={styles.noResults}>
            You haven’t added any favorites yet.
          </p>
        ) : (
          <div className={styles.grid}>
            {favs.map((m) => (
              <div key={m.id} className={styles.card}>
                <Link href={`/movie/${m.id}`} className={styles.cardLink}>
                  {m.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                      alt={m.title}
                      width={200}
                      height={300}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                  <h2>{m.title}</h2>
                  <p>
                    {new Date(m.release_date).getFullYear()} · ⭐️{" "}
                    {m.vote_average.toFixed(1)}
                  </p>
                </Link>
                <button
                  onClick={() => remove(m.id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
//               className={styles.favButton}
