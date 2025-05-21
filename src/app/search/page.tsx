"use client";

import { useSearchStore } from "@/stores/useSearchStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { useFavoritesStore, MovieSummary } from "@/stores/useFavoritesStore";
import { Heart, HeartOff } from "lucide-react";

export default function SearchResultsPage() {
  const params = useSearchParams();
  const query = params.get("query") || "";
  const { setQuery, fetchResults, results } = useSearchStore();

  const favorites = useFavoritesStore((s) => s.favorites);
  const addFav = useFavoritesStore((s) => s.addFavorite);
  const removeFav = useFavoritesStore((s) => s.removeFavorite);

  // whenever `?query=` changes, fetch
  useEffect(() => {
    if (!query) return;
    setQuery(query);
    fetchResults();
  }, [query, setQuery, fetchResults]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {/* Title */}
        <h1 className={styles.results}>Results for “{query}”</h1>

        {/* Grid of movie cards */}
        <div className={styles.films}>
          {results.length === 0 ? (
            <p className={styles.noResults}>No films found.</p>
          ) : (
            results.map((m) => {
              const isFav = favorites.some((f) => f.id === m.id);
              const toggle = () => {
                const summary: MovieSummary = {
                  id: m.id,
                  title: m.title,
                  poster_path: m.poster_path,
                  release_date: m.release_date,
                  vote_average: m.vote_average,
                };
                isFav ? removeFav(m.id) : addFav(summary);
              };
              return (
                <div key={m.id} className={styles.movieCard}>
                  <Link
                    key={m.id}
                    href={`/movie/${m.id}`}
                    className={styles.cardLink} // you can move the class here
                  >
                    <div className={styles.posterWrapper}>
                      {m.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                          alt={m.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className={styles.noImage}>No Image</div>
                      )}
                    </div>
                    <h2>{m.title}</h2>
                    <p>
                      {new Date(m.release_date).getFullYear()} · ⭐️{" "}
                      {m.vote_average.toFixed(1)}
                    </p>
                  </Link>
                  <button
                    onClick={toggle}
                    className={styles.favBtn}
                    aria-label={
                      isFav ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    <Heart
                      size={24}
                      strokeWidth={2}
                      fill={isFav ? "#e25555" : "none"}
                      color={isFav ? "#e25555" : "#34346b"}
                    />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
// export default function Hello() {
//   return <div>
//     Hello Movie
//     Hello Movie
//     Hello Movie
//     Hello Movie
//     Hello Movie
//     Hello Movie
//     Hello Movie
//   </div>;
// }
