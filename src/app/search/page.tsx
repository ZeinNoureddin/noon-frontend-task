"use client";

import { useSearchStore } from "@/stores/useSearchStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import searchStyles from "@/styles/Search.module.scss";
import commonStyles from "@/styles/Common.module.scss";
import Loading from "@/app/loading";

export default function SearchResultsPage() {
  const styles = { ...commonStyles, ...searchStyles };
  const params = useSearchParams();
  const query = params.get("query") || "";
  const { setQuery, fetchResults, results, loading } = useSearchStore();

  useEffect(() => {
    if (!query) return;
    setQuery(query);
    fetchResults();
  }, [query, setQuery, fetchResults]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {/* Show the spinner while loading */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            {/* <span>Loading…</span> */}
          </div>
        ) : (
          <>
            {/* Title */}
            <h1 className={styles.results}>Results for “{query}”</h1>

            {/* Grid of movie cards */}
            <div className={styles.films}>
              {results.length === 0 ? (
                <p className={styles.noResults}>No films found.</p>
              ) : (
                results.map((m) => (
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
          </>
        )}
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
