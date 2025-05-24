"use client";

import { useSearchStore } from "@/stores/useSearchStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import searchStyles from "./Search.module.scss";
import commonStyles from "@/styles/Common.module.scss";

export default function SearchResultsPage() {
  const styles = { ...commonStyles, ...searchStyles };
  const params = useSearchParams();
  const query = params.get("query") || "";
  const { setQuery, fetchResults, results, loading, error } = useSearchStore();

  useEffect(() => {
    if (!query) return;
    setQuery(query);
    fetchResults();
  }, [query, setQuery, fetchResults]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
          </div>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : results.length === 0 ? (
          <div className={styles.noResults}>
            <p>No films found.</p>
          </div>
        ) : (
          <>
            <h1 className={styles.pageHeader}>Results for “{query}”</h1>
            <div className={styles.films}>
              {results.map((m) => (
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  poster_path={m.poster_path}
                  release_date={m.release_date}
                  vote_average={m.vote_average}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
